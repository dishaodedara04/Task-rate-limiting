const Queue = require('bull');

// Create a task queue for processing tasks
const taskQueue = new Queue('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6380,
  },
});

module.exports = taskQueue;
