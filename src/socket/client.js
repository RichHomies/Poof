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
    this.openRequests = {
      //uuid : cb
    };
};

SocketLibrary.prototype.sendMessage = function(url, body){
    var id = uuid.v1();
    var str = JSON.stringify({id:id, url: url, body:body});
    this.socket.send(str);
    return {
      success: function(cb) {
        this.openRequests[id] = cb;
      }
    }
};

SocketLibrary.prototype.subscribe = function(){
    this.socket.onmessage(function(message) {
        var obj = JSON.parse(message);
        var fn = this.openRequests[obj.id];
        fn(obj.body);
        delete this.openRequests[obj.id]
        // cb(obj);
            
    });  
};



ws.then(function(socket){
    var socketbiblioteca = new SocketLibrary(socket);
    return socketbiblioteca;
});

module.exports = ws;