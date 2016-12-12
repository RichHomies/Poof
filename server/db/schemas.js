var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  phone: String,
  friends: String
});

module.exports = {
  userModel : mongoose.model('User', userSchema)
};
