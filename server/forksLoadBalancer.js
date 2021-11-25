const express = require('express');
const cluster = require('cluster');
const mandelbrotGenerator = require('./mandelbrotGenerator');
const forks = require('os').cpus().length;
const app = express()

const imageObject = {}
for (let i=0; i<forks; i++){
    imageObject[`part${i+1}`] = []
}
console.log(imageObject)

const forksLoadBalancer = () => {
    if (cluster.isPrimary){
        //pid is a unique number for each running process in an operating system
        console.log(`Master ${process.pid} is running`)
    
        //spawn a new worker process for each core in the CPU
        for (let i=0; i<forks; i++){
            cluster.fork();
        }
    
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    }
    else {
        mandelbrotGenerator(cluster.worker.id, forks)
    }
}

module.exports = forksLoadBalancer;