const asyncHandler = require('express-async-handler')

const Mood = require('../models/moodModel')
const User = require('../models/userModel')

// @desc Gets moods
// @route GET /api/moods
// @access Private
const getMoods = asyncHandler(async (req, res) => {
const moods = await Mood.find({ user: req.user.id })

  res.status(200).json(moods)
})

// @desc Create moods
// @route POST /api/moods
// @access Private
const createMood = asyncHandler(async (req, res) => {
  if(req.body.rating < 0) {
    res.status(400)
    throw new Error('Mood selection is required')
  }

  const mood = await Mood.create({
    note: req.body.note,
    rating: req.body.rating,
    date: req.body.date,
    user: req.user.id,
  })
   
  res.status(200).json(mood)
})

// @desc Update mood
// @route PUT /api/moods/:id
// @access Private
const updateMood = asyncHandler(async (req, res) => {
  const mood = await Mood.findById(req.params.id)

  if(!mood) {
    res.status(400)
    throw new Error('Mood not found')
  }

  const user = await User.findById(req.user.id)

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(mood.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedMood)
})

// @desc deletes mood
// @route DELETE /api/moods/:id
// @access Private
const deleteMood = asyncHandler(async (req, res) => {
  const mood = await Mood.findById(req.params.id)

  if(!mood) {
    res.status(400)
    throw new Error('Mood not found')
  }

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(mood.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  await mood.deleteOne()
  
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMoods,
  createMood,
  updateMood,
  deleteMood
}