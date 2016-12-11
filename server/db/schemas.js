var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  friends: String
});

module.exports = {
  userModel : mongoose.model('User', userSchema)
};
