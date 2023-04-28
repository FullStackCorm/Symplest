const express = require('express')
const router = express.Router()
const {getPain, createPain, updatePain, deletePain} = require('../controllers/painController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getPain).post(protecc, createPain)
router.route('/:id').delete(protecc, deletePain).put(protecc, updatePain)

module.exports = router 