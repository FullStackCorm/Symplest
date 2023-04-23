const mongoose = require('mongoose')

const moodSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    note: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
    },
    }, {
    timestamps: true,
})

module.exports = mongoose.model('Mood', moodSchema)