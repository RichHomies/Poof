#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/poof';
var config = require('./db/config');
var db = mongoose.connection;
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});


var socketRouter = require('./routes.js').socketRouter

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

mongoose.connect(dbUrl);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!');
  init();
});


function init(){
    function originIsAllowed(origin) {
      // put logic here to detect whether the specified origin is allowed.
      console.log(origin);
      return true;
    }

    wsServer.on('request', function(request) {
        if (!originIsAllowed(request.origin)) {
          // Make sure we only accept requests from an allowed origin
          request.reject();
          console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
          return;
        }

        var connection = request.accept('echo-protocol', request.origin);
        console.log((new Date()) + ' Connection accepted.' + JSON.stringify(Object.keys(connection)));
        socketRouter(connection);
    });
}

