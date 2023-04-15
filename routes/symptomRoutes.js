const express = require('express')
const router = express.Router()
const {getSymptoms, createSymptom, updateSymptom, deleteSymptom} = require('../controllers/symptomController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getSymptoms).post(protecc, createSymptom)
router.route('/:id').delete(protecc, deleteSymptom).put(protecc, updateSymptom)

module.exports = router 