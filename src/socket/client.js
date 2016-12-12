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
    var that = this;
    return {
      success: function(cb) {
        that.openRequests[id] = cb;
      }
    };
};

SocketLibrary.prototype.subscribe = function(){
    var that = this;
    this.socket.onmessage = function(message) {
        var data = JSON.parse(message.data);
        var cb = that.openRequests[data.id];
        cb(data.body);
        delete that.openRequests[data.id];           
    };  
};



var biblioteca = ws.then(function(socket){
    var socketbiblioteca = new SocketLibrary(socket);
    return socketbiblioteca;
});

module.exports = biblioteca;