var userModel = require('./schemas.js').userModel;
var Promise = require("bluebird");


var create = function(name, username, password, phone){
    var promise = new userModel({
                    name: name,
                    username: username,
                    password: password,
                    phone: phone
                });

    return promise.save();
};

var findByCriteria = function(criteria, value){
    var lookup = {
      name: 'name',
      username: 'username',
      phone: 'phone',
    };

    var obj = {};
    obj[lookup[criteria]] = value;
    
    return userModel.find(obj).exec();
};

var remove = function(id, cb){
  userModel.findOne({ _id: id }).remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('success');
    }
    cb(err, obj);
  });
};


var deleteAll = function(){
  userModel.remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('deleted err thang');
    }
  });
};

var editUser = function(id, obj){
  return new Promise(function (resolve, reject) {
    userModel.update({ _id: id }, { $set: obj }, function(err, user){
      if(err){
        console.log('err ' , err);
        reject(err);
      } else {
        console.log('successfully edited Project ');
        resolve('successfully edited Project ');
      }
    });
  });
};

module.exports = {
    create: create,
    findByCriteria: findPoofByCriteria,
    remove: remove,
    deleteAll: deleteAll,
    editUser: editUser
};