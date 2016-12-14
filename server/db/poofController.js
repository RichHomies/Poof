var poofModel = require('./schemas.js').poofModel;

var create = function(from, to, text){
    var promise = new poofModel({
                    from: from,
                    to: [to],
                    text: text
                });
    console.log('1');
    
    return promise.save();
};

var findPoofByCriteria = function(criteria, value){
    var lookup = {
        from: 'from',
        to: 'to',
        text: 'text'
    };

    var obj = {};
    obj[lookup[criteria]] = value;
    
    return poofModel.find(obj).exec();
};

var remove = function(id, cb){
  poofModel.findOne({ _id: id }).remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('success');
    }
    cb(err, obj);
  });
};


var deleteAll = function(){
  poofModel.remove(function(err, obj){
    if(err){
      console.log('err ', err);
    } else {
      console.log('deleted err thang');
    }
  });
}


module.exports = {
    create: create,
    findByCriteria: findPoofByCriteria,
    remove: remove,
    deleteAll: deleteAll
};