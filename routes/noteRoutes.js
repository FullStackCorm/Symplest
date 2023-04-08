const express = require('express')
const router = express.Router()
const {getNotes, createNote, updateNote, deleteNote} = require('../controllers/noteController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getNotes).post(protecc, createNote)
router.route('/:id').delete(protecc, deleteNote).put(protecc, updateNote)

module.exports = router 