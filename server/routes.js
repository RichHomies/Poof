var user = require('./db/userController.js');
var Response = function(connection, id){
  this.connection = connection;
  this.id = id;
};

var ActionRouter = function (){
  this.store = {};
};

ActionRouter.prototype.register = function(url, verb, fn){
  if(this.store[url]){
    this.store[url][verb] = fn;
  } else {
    this.store[url] = {};
    this.store[url][verb] = fn;

  }
};

ActionRouter.prototype.datWay = function(connection, message){
  var data  = JSON.parse( message.utf8Data);
  var response = new Response(connection, data.id);
  this.store[data.url][data.action](response, data.body);
};

Response.prototype.respond = function(data, status, err){
  var obj = {
    error: err,
    status: status,
    body: data,
    id: this.id
  };
  console.log('obj ', obj);
  this.connection.sendUTF(JSON.stringify(obj));
};

var actionRouter = new ActionRouter();
actionRouter.register('/signup', 'post', user.signup);
actionRouter.register('/login', 'post', user.login);
actionRouter.register('/poof', 'post', function(response, body){
  console.log(body);
});


function socketRouter (connection) {
  connection.on('message', function(message) {
    actionRouter.datWay(connection, message);
  });
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
}

module.exports = {
  socketRouter: socketRouter
};