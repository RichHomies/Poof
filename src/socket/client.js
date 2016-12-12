//how to use me, dood
// var socketPromise = init();
// socketPromise.then(function(socket){
//     socket.subscribe(function(message){
//         console.log('yuhhhhh : ', message);
//     });
//     socket.sendMessage('/joe', 'string');
// });
var uuid = require('react-native-uuid');

var ws = require('./socketConnection');

var SocketLibrary = function(socket){
    this.socket = socket;
    this.openRequests = {};
    this.subscribe();
};

SocketLibrary.prototype.sendMessage = function(url, body){
    var id = uuid.v1();
    var str = JSON.stringify({id:id, url: url, body: body});
    this.socket.send(str);
    var that = this
    return {
      success: function(cb) {
        that.openRequests[id] = cb;
      }
    }
};

SocketLibrary.prototype.subscribe = function(){
    this.socket.onmessage = function(message) {
        //shit we stuck
        console.log('message ', Object.keys(message.data));
        var cb = this.openRequests[message.data.id];
        cb(message.data.body);
        delete this.openRequests[message.data.id]            
    };  
};



var biblioteca = ws.then(function(socket){
    var socketbiblioteca = new SocketLibrary(socket);
    return socketbiblioteca;
});

module.exports = biblioteca;