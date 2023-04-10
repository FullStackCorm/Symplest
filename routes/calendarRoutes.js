const express = require('express')
const router = express.Router()
const {getCalendarEntries, createCalendarEntry, deleteCalendarEntry} = require('../controllers/calendarController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getCalendarEntries).post(protecc, createCalendarEntry)
router.route('/:id').delete(protecc, deleteCalendarEntry)

module.exports = router