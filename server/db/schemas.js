var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  phone: String,
  friends: String,
  poofs: [String]
});

var poofSchema = new Schema({
    from: String,
    to: [String],
    text: String
});

module.exports = {
  userModel : mongoose.model('User', userSchema),
  poofModel : mongoose.model('Poof', poofSchema)
};
