var poof = require('./poofController.js');
var mongoose = require('mongoose');
var db = mongoose.connection;
var dbUrl = 'mongodb://localhost/poof';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected!');

    runTests();
});

function runTests() {

    poof.create('joe',['zach', 'steve'], 'yoads')
        .then(function(data){
            console.log('created data', data);
            return poof.findByCriteria('to', 'steve');
        })
        .then(function(data){
            console.log('criteria find', data);
        })
        .then(function(data){
            poof.deleteAll();

        })
        .catch(function(err){
            console.log('err in this thang', err);
        });

}