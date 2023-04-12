const express = require('express')
const router = express.Router()
const {getEvents, createEvent, deleteEvent} = require('../controllers/eventController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getEvents).post(protecc, createEvent)
router.route('/:id').delete(protecc, deleteEvent)

module.exports = router 