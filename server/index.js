
const express = require('express');
const cors = require('cors');
const server = require('http').createServer(app);
const WebSocket = require('ws');
const { fstat } = require('fs');

const wss = new WebSocket.Server( {server: server} )

wss.on('connection', 
    function connection(ws){
        console.log('new client has connected');
        ws.send('hello, new client');

        ws.on('message', function incoming(message){
            console.log(message);
        })
    })