const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name.']
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email address.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.']
  },
}, 
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)