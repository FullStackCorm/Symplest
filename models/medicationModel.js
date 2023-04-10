const mongoose = require('mongoose');

const MedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Medication name is required']
    },
    strength: {
        type: String,
        required: [true, 'Medication strength is required']
    },
    doseForm: {
        type: String,
    },
    directions: {
        type: String,
        required: [true, 'Directions are required']
    },
    timeOfDay: {
        type: String,
    },
    prescriber: {
        type: String,
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
}, {
    timestamps: true,
});

module.exports = mongoose.model("Medication", MedSchema);