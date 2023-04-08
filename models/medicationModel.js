const mongoose = require('mongoose');

const MedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    strength: {
        type: String,
        required: true,
    },
    directions: {
        type: String,
        required: true,
    },
    timeOfDay: {
        type: String,
    },
    prescriber: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    //description: {
    //    type: String,
    //},
    //purpose: {
    //    type: String,
    //},
    //lastRefilled: {
    //    type: String
    //},
    // updated_date: {
    //     type: Date,
    //     default: Date.now,
    // },
    
});

module.exports = mongoose.model("Medication", MedSchema);