var Response = function(connection, id){
  this.connection = connection;
  this.id = id;
};

Response.prototype.respond(data){
  var obj = {
    body: data,
    id: this.id
  }
  this.connection.sendUTF(obj);
}

function socketRouter (connection) {
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          console.log('Received Message: ' + message.utf8Data);
          var response = new Response(connection, message.utf8Data.id);
          
          switch (message.utf8Data.url) {
            case '/signup':
              handleSignup(response);
              break
          }
          // connection.sendUTF(message.utf8Data);
      }
      else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          // connection.sendBytes(message.binaryData);
      }
  });
}


function handleSignup(response) {
  //use mongoose to create new account
  
  //signup
}