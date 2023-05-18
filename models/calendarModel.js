const mongoose = require('mongoose')

const calendarSchema = mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    // TODO extract magic strings into a json file for language suppport
    required: [true, 'Text entry is required']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Entry', calendarSchema)