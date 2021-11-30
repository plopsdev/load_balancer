const body = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mandelbrotGenerator = require('./mandelbrotGenerator');

const app1 = express();
const app2 = express();

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());

app1.use(morgan('dev'))
app2.use(morgan('dev'))

const handler = serverNum => (req, res) => {
    //console.log(`server ${serverNum}`, req.method, req.url, req.body, req.query);
    const { real, imaginary, iterations } = req.query
    let result = mandelbrotGenerator(real, imaginary, iterations)
    console.log(`Hello from server ${serverNum}!`)
    res.send(result);
};

// Only handle GET and POST requests
app1.get('/mandelbrot', handler(1))
app2.get('/mandelbrot', handler(2))

app1.listen(3010);
app2.listen(3011);