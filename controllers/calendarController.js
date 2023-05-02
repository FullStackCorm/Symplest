const asyncHandler = require('express-async-handler')

const Calendar = require('../models/calendarModel')
const User = require('../models/userModel')

// @desc Gets entries
// @route GET /api/calendar-entries
// @access Private
const getCalendarEntries = asyncHandler(async (req, res) => {
const entries = await Entry.find({ user: req.user.id })

  res.status(200).json(entries)
})

// @desc Create entry
// @route POST /api/calendar-entries
// @access Private
const createCalendarEntry = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    // TODO extract magic strings into a json file for language suppport
    throw new Error('Text entry is required')
  }

  const entry = await Entry.create({
    text: req.body.text,
    user: req.user.id,
  })
   
  res.status(200).json(entry)
})

// @desc Update entry
// @route PUT /api/calendar-entries/:id
// @access Private
// const updatCalendarEntry = asyncHandler(async (req, res) => {
//   const entry = await Entry.findById(req.params.id)

//   if(!entry) {
//     res.status(400)
//     throw new Error('Entry not found')
//   }

//   const user = await User.findById(req.user.id)

//   if(!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   if(entry.user.toString() !== user.id){
//     res.status(401)
//     throw new Error('User not authorized to perform this action')
//   }

//   const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedEntry)
// })

// @desc Deletes entry
// @route DELETE /api/calendar-entries/:id
// @access Private
const deleteCalendarEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id)

  if(!entry) {
    res.status(400)
    // TODO extract magic strings into a json file for language suppport
    throw new Error('Entry not found')
  }

  if(!req.user) {
    res.status(401)
    // TODO extract magic strings into a json file for language suppport
    throw new Error('User not found')
  }

  if(entry.user.toString() !== req.user.id){
    res.status(401)
    // TODO extract magic strings into a json file for language suppport
    throw new Error('User not authorized to perform this action')
  }

  await entry.deleteOne()
  
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getCalendarEntries,
  createCalendarEntry,
  // updateCalendarEntry,
  deleteCalendarEntry
}