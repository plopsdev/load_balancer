
const express = require('express');
const cors = require('cors');
app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const mandelbrotGenerator = require('./mandelbrotGenerator');

const wss = new WebSocket.Server( {server: server} )

wss.on('connection', 
    function connection(ws){
        console.log('new client has connected');
        // ws.send('hello, new client');

        ws.on('message', function incoming(message){
            const startTime = Date.now()
            const translated = Buffer.from(message, 'base64').toString();
            const { width, height, iterations } = JSON.parse(translated)
            console.log(translated)
            const imageArray = mandelbrotGenerator(width, height, iterations)
            ws.send(JSON.stringify(imageArray));
            const stopTime = Date.now()
            console.log(`Time Taken to execute = ${(stopTime - startTime)/1000} seconds`);
        })
    }
)

app.use(cors());
app.use(express.json());

server.listen(3002)