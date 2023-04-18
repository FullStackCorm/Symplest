const mongoose = require('mongoose')

const moodSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    moodText: {
        type: String,
    },
    mood: {
        type: Number,
        required: true,
    },
    }, {
    timestamps: true,
})

module.exports = mongoose.model('Mood', moodSchema)