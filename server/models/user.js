var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const validate = require('mongoose-validator');
// const uniqueValidator = require('mongoose-unique-validator');
const encrypt = require('../helpers/encrypt')


var userSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true,
    unique:true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is not valid']
  },
  password: {
    type:String,
    required:true,
    minlength: 6
  }
});

userSchema.pre('save', function(next) {
  this.password = encrypt.hashPassword(this.password, this.email)
  next()
})

var User = mongoose.model('User', userSchema);

module.exports = User