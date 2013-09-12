#!/usr/bin/env node

var WebSocketServer = require('websocket').server;
var WebSocketRouter = require('websocket').router;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + " Received request for " + request.url);
});
server.listen(8088, function() {
    console.log((new Date()) + " Server is listening on port 8088");
});

wsServer = new WebSocketServer({
    httpServer: server,
});

var router = new WebSocketRouter();
router.attachServer(wsServer);

router.mount('*', '*', function(request) {
    var connection = request.accept(request.origin);
    console.log((new Date()) + " connection accepted from " + connection.remoteAddress);
    
    connection.on('message', function(message) {
        console.log("Message from client: " + JSON.stringify(message));
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + " peer " + connection.remoteAddress + " disconnected.");
    });
    
    connection.on('error', function(error) {
        console.log("Connection error for peer " + connection.remoteAddress + ": " + error);
    });

    setInterval(function() {
      connection.send("Message from server");
    }, 1000);
});
