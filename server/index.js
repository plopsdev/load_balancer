const express = require('express');
const cors = require('cors');
const app = express()
const morgan = require('morgan');

const mandelbrotGenerator = require('./mandelbrotGenerator');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/mandelbrot', function (req, res) {
    const startTime = Date.now()
    const { width, height, iterations } = req.query;
    const imageArray = mandelbrotGenerator(parseInt(width), parseInt(height), parseInt(iterations))
    res.send(imageArray);
    const stopTime = Date.now();
    console.log(`Time Taken to execute = ${(stopTime - startTime)/1000} seconds`);
})


app.listen(3002)