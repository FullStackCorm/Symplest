const asyncHandler = require('express-async-handler');

const Medication = require('../models/medicationModel');
const User = require('../models/userModel');

// @desc Get meds
// @route GET /api/medications
// @access Private
const getMedications = asyncHandler(async (req, res) => {
    const medications = await Medication.find({ user: req.user.id });
        res.status(200).json(medications); 
});

// @desc Create med
// @route POST /api/medications
// @access Private
const createMedication = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.strength || !req.body.directions) {
        res.status(400)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('Medication name, strength, and directions are required')
    }
    
    const medication = await Medication.create({
        name: req.body.name,
        strength: req.body.strength,
        doseForm: req.body.doseForm,
        directions: req.body.directions,
        prescriber: req.body.prescriber,
        timeOfDay: req.body.timeOfDay,
        user: req.user.id
    });

    res.status(200).json(medication)
});

// @desc Update med
// @route PUT /api/medications:id
// @access Private
const updateMedication = asyncHandler(async (req, res) => {
    const medication = await Medication.findById(req.params.id)

    if(!medication) {
        res.status(400)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('Medication not found')
    }

    const user = await User.findById(req.user.id)

    if(!req.user) {
        res.status(401)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('User not found')
    }

    // ensures only the currently logged in user's meds are found
    if(medication.user.toString() !== user.id) {
        res.status(401)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('User not authorized to perform this action')
    }

    const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true }
    )
    res.status(200).json(updatedMedication)
})

// @desc Delete med
// @route DELETE /api/medications:id
// @access Private
const deleteMedication = asyncHandler(async (req, res) => {
    const medication = await Medication.findById(req.params.id)

    if(!medication) {
        res.status(400)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('Medication not found')
    }

    if(!req.user) {
        res.status(401)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('User not found')
    }

    if(medication.user.toString() !== req.user.id) {
        res.status(401)
        // TODO extract magic strings into a json file for language suppport
        throw new Error('User not authorized to perform this action')
    }

    await medication.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getMedications,
    createMedication,
    updateMedication,
    deleteMedication
}