const express = require('express')
const router = express.Router()
const {getMoods, createMood, updateMood, deleteMood} = require('../controllers/moodController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getMoods).post(protecc, createMood)
router.route('/:id').delete(protecc, deleteMood).put(protecc, updateMood)

module.exports = router 