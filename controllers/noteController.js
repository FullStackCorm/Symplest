const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const User = require('../models/userModel')

// @desc Gets notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
const notes = await Note.find({ user: req.user.id })

  res.status(200).json(notes)
})

// @desc Create notes
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Text entry is required')
  }

  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,
  })
   
  res.status(200).json(note)
})

// @desc Update note
// @route PUT /api/notes/id:
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if(!note) {
    res.status(400)
    throw new Error('Note not found')
  }

  const user = await User.findById(req.user.id)

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(note.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedNote)
})

// @desc Deletes note
// @route DELETE /api/notes/id:
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if(!note) {
    res.status(400)
    throw new Error('Note not found')
  }

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(note.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized to perform this action')
  }

  await note.deleteOne()
  
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
}