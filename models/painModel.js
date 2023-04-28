const mongoose = require('mongoose')

const painSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    note: {
        type: String,
    },
    type: {
        type: String, 
        // options: ['Headache', 'Neck Pain', 'Back (upper)', 'Back (middle)', 'Back (lower)', 'Leg Pain', 'Nerve Pain', 'Shoulder Pain', 'Wrist Pain', '']
    },
    severity: {
        type: Number,
        required: true ['Symptom severity selection required'],
    },
    date: {
        type: String,
    },
    }, {
    timestamps: true,
})

module.exports = mongoose.model('Pain', painSchema)