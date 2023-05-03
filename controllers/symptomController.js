const asyncHandler = require('express-async-handler')

const Symptom = require('../models/symptomModel')
const User = require('../models/userModel')

// @desc Gets symptoms
// @route GET /api/symptoms
// @access Private
const getSymptoms = asyncHandler(async (req, res) => {
const symptoms = await Symptom.find({ user: req.user.id })

  res.status(200).json(symptoms)
})

// @desc Create symptoms
// @route POST /api/symptoms
// @access Private
const createSymptom = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Text entry is required')
  }

  const symptom = await Symptom.create({
    text: req.body.text,
    user: req.user.id,
  })
   
  res.status(200).json(symptom)
})

// @desc Update symptom
// @route PUT /api/symptoms/:id
// @access Private
const updateSymptom = asyncHandler(async (req, res) => {
  const symptom = await Symptom.findById(req.params.id)

  if(!symptom) {
    res.status(400)
    throw new Error('Symptom not found')
  }

  const user = await User.findById(req.user.id)

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(symptom.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  const updatedSymptom = await Symptom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedSymptom)
})

// @desc Deletes symptom
// @route DELETE /api/symptoms/:id
// @access Private
const deleteSymptom = asyncHandler(async (req, res) => {
  const symptom = await Symptom.findById(req.params.id)

  if(!symptom) {
    res.status(400)
    throw new Error('Symptom not found')
  }

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(symptom.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  await symptom.deleteOne()  
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getSymptoms,
  createSymptom,
  updateSymptom,
  deleteSymptom
}