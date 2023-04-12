const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')
const User = require('../models/userModel')

// @desc Gets events
// @route GET /api/events
// @access Private
const getEvents = asyncHandler(async (req, res) => {
const events = await Event.find({ user: req.user.id })

  res.status(200).json(events)
})

// @desc Create events
// @route POST /api/events
// @access Private
const createEvent = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400)
    throw new Error('This field is required')
  }

  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    user: req.user.id,
  })
   
  res.status(200).json(event)
})

// @desc Update event
// @route PUT /api/events/:id
// @access Private
// const updateEvent = asyncHandler(async (req, res) => {
//   const event = await Event.findById(req.params.id)

//   if(!event) {
//     res.status(400)
//     throw new Error('Event not found')
//   }

//   const user = await User.findById(req.user.id)

//   if(!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   if(event.user.toString() !== user.id){
//     res.status(401)
//     throw new Error('User not authorized to perform this action')
//   }

//   const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedEvent)
// })

// @desc Deletes event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if(!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(event.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  await event.deleteOne()
  
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getEvents,
  createEvent,
  // updateEvent,
  deleteEvent
}