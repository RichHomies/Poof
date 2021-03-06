var user = require('./db/userController.js');
var poof = require('./db/poofController.js');
var Promise = require('bluebird');
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
  this.connection.sendUTF(JSON.stringify(obj));
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



var actionRouter = new ActionRouter();
actionRouter.register('/signup', 'post', user.signup);
actionRouter.register('/login', 'post', user.login);
actionRouter.register('/poof', 'post', function(response, body){
  var results;
  Promise.all([user.findUser(body.sender), user.findUser(body.recipient)]).then(function(resultz) {
    //Results[0] is the sender, Results[1] is the recipient
    results = resultz
    return poof.create(body.sender, body.recipient, body.message)
  })
  .then(function(poof) {
    console.log('poof id', poof._id)
    results[0].sentPoofs.push(poof._id)
    user.editUser(results[0]._id, {sentPoofs: results[0].sentPoofs})
    .then(function() {
      results[1].receivedPoofs.push(poof._id)
      return user.editUser(results[1]._id, {receivedPoofs: results[1].receivedPoofs})
    })
  })
  .then(function() {
    response.respond('Successfully sent message', 'success');
  })
  .catch(function(e) {
    console.log('whaaaa', e)
  })
});

actionRouter.register('/poof', 'get', function(response, body){
  user.findUserById(body.id)
  .then(function(person) {
    var received = person.receivedPoofs.map(function(val, i) {
      return poof.findByCriteria('id', val)
    })
    Promise.all(received).then(function(results) {
      console.log('results', results)
      response.respond(results, 'success')
    })
  })
  .catch(function(e) {
    console.log('wtf', e)
  })
})


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