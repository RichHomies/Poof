//how to use me, dood
// var socketPromise = init();
// socketPromise.then(function(socket){
//     socket.subscribe(function(message){
//         console.log('yuhhhhh : ', message);
//     });
//     socket.sendMessage('/joe', 'string');
// });

var ws = require('./socketConnection');

var SocketLibrary = function(socket){
    this.socket = socket;
};

SocketLibrary.prototype.sendMessage = function(url, body){
    var str = JSON.stringify({url: url, body:body});
    this.socket.send(str);
};

SocketLibrary.prototype.subscribe = function(cb){
    this.socket.onmessage(function(message) {
        var str = JSON.parse(message);
        cb(str);
            
    });  
};

ws.then(function(socket){
    var socketbiblioteca = new SocketLibrary(socket);
    return socketbiblioteca;
});

module.exports = ws;