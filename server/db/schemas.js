var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  phone: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sentPoofs: [{ type: Schema.Types.ObjectId, ref: 'Poof' }],
  receivedPoofs: [{ type: Schema.Types.ObjectId, ref: 'Poof' }]
});

var poofSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    duration: Number
});

module.exports = {
  userModel : mongoose.model('User', userSchema),
  poofModel : mongoose.model('Poof', poofSchema)
};
