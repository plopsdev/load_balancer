const express = require('express');
const request = require('request');
const morgan = require('morgan');
const servers = ['http://localhost:3010', 'http://localhost:3011' ];
let cur = 0;
const server = express()
server.use(morgan('dev'))

const handler = (req, res) => {
    const { real, imaginary, iterations } = req.query;  
    // Pipe the vanilla node HTTP request (a readable stream) into `request`
    // to the next server URL. Then, since `res` implements the writable stream
    // interface, you can just `pipe()` into `res`.

    req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
    cur = (cur + 1) % servers.length;
};
server.get('/mandelbrot', handler);

server.listen(8080);