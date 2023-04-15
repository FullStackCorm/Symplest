const mongoose = require('mongoose')

const symptomSchema = mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Text entry is required']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Symptom', symptomSchema)