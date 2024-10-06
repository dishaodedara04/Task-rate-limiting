const cluster = require('cluster');
const os = require('os');
const numCPUs = 2; // Number of replicas

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`W
        orker ${worker.process.pid} died. Forking a new one.`);
    cluster.fork();
  });
} else {
  // Worker processes will run the server
  require('./server');
}

  