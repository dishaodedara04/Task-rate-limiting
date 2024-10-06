const express = require('express');
const fs = require('fs'); 
const taskQueue = require('./queue/queue');
const { rateLimiterPerSecond, rateLimiterPerMinute } = require('./rateLimiter/rateLimiter');
const { task } = require('./utils/task');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API running fine");
});


app.post('/task', async (req, res) => {
    const userId = req.body.user_id;

    try {
        await rateLimiterPerSecond.consume(userId);
        await rateLimiterPerMinute.consume(userId);

        
        await task(userId);
        res.status(200).send('Task completed.');
    } catch (rateLimiterError) {
        
        taskQueue.add({ userId });
        res.status(429).send('Task queued due to rate limit.');
    }
});

// GET endpoint to retrieve tasks
app.get('/tasks', (req, res) => {
    fs.readFile('./task.log', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
            return res.status(500).send('Error reading log file.');
        }

      
        const tasks = data.split('\n').filter(line => line); 

      
        res.status(200).json(tasks);
    });
});


// Queue task processing
taskQueue.process(async (job) => {
    const { userId } = job.data;

    // Wait until rate limits allow processing
    await rateLimiterPerSecond.consume(userId);
    await rateLimiterPerMinute.consume(userId);

    await task(userId);
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
