var user = require('./db/userController.js');
var Response = function(connection, id){
  this.connection = connection;
  this.id = id;
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

function socketRouter (connection) {
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          var data  = JSON.parse(message.utf8Data);
          var response = new Response(connection, data.id);
          console.log('data', data)
          switch (data.url) {
            case '/signup':
              user.signup(response, data.body);
              break;
              case '/login':
              user.login(response, data.body);
              break;
          }
          // connection.sendUTF(message.utf8Data);
      }
      else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          // connection.sendBytes(message.binaryData);
      }
  });
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
}

module.exports = {
  socketRouter: socketRouter
};