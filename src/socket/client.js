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

SocketLibrary.prototype.sendMessage = function(url, action, body){
    var id = uuid.v1();
    this.openRequests[id] = {};
    var str = JSON.stringify({id:id, url: url, action: action, body: body});
    this.socket.send(str);
    var that = this;
    var handlers = {
      success: function(cb) {
        that.openRequests[id]['success'] = cb;
        return handlers;
      },
      failure: function(cb) {
        that.openRequests[id]['failure'] = cb;
        return handlers;
      }
    };
    
    return handlers;
};

SocketLibrary.prototype.subscribe = function(){
    var that = this;
    this.socket.onmessage = function(message) {
        var data = JSON.parse(message.data);
        var requestObj = that.openRequests[data.id];
        var cb;
        if (data.status === 'success') {
            cb = requestObj['success']
            cb(data.body)
        } else {
            cb = requestObj['failure']
            cb(data.error)
        }
        delete that.openRequests[data.id]; 
    };  
};



var biblioteca = ws.then(function(socket){
    var socketbiblioteca = new SocketLibrary(socket);
    return socketbiblioteca;
});

module.exports = biblioteca;