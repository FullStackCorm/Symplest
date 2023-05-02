const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    // TODO extract magic strings into a json file for language suppport
    required: [true, 'Please enter a name']
  },
  email: {
    type: String,
    // TODO extract magic strings into a json file for language suppport
    required: [true, 'Please enter a valid email address'],
    unique: true
  },
  password: {
    type: String,
    // TODO extract magic strings into a json file for language suppport
    required: [true, 'Please enter a password']
  },
}, 
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)