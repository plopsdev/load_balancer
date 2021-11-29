
const cors = require('cors');

const morgan = require('morgan');
const cluster = require('cluster');
const mandelbrotGenerator = require('./mandelbrotGenerator');
const express = require('express');
const app = express()
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const forks = require('os').cpus().length;
// const forks = 1;



const imageObject = {}
for (let i=0; i<forks; i++){
    imageObject[`part${i+1}`] = []
}


//--Using cluster--//

if (cluster.isPrimary){
    //pid is a unique number for each running process in an operating system
    console.log(`Master ${process.pid} is running`)

    //spawn a new worker process for each core in the CPU
    for (let i=0; i<forks; i++){
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online.');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
// For Worker
else { 
    console.log(cluster.worker.id)
    app.get('/mandelbrot', function (req, res) {
        const { width, height, iterations } = req.query;
        console.log(cluster.worker.id)
        mandelbrotGenerator( cluster.worker.id, forks)
        
    })
}

app.listen(3001);

//--basic--//

// app.get('/mandelbrot', function (req, res) {
//     console.log(forks)
//     const startTime = Date.now()
//     const { width, height, iterations } = req.query;
//     const imageArray = mandelbrotGenerator(parseInt(width), parseInt(height), parseInt(iterations))
//     res.send(imageArray);
//     const stopTime = Date.now();
//     console.log(`Time Taken to execute = ${(stopTime - startTime)/1000} seconds`);
// })
// app.listen(3001);

//--Using Nginx--//


// app.listen(3011);
// app.listen(3012);
// app.listen(3013);
// app.listen(3014);
// app.listen(3015);
