// utils/task.js
const fs = require('fs');

const task = async (userId) => {
    const timestamp = new Date().toISOString();
    const logEntry = `Task completed for User ID: ${userId} at ${timestamp}\n`;

    // Append to log file
    fs.appendFile('./task.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // Simulate task processing time
    return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating task delay
};

module.exports = { task };
