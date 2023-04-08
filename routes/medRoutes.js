const express = require('express')
const router = express.Router()
const {getMedications, createMedication, updateMedication, deleteMedication} = require('../controllers/medController')

const {protecc} = require('../middleware/authMiddleware')

router.route('/').get(protecc, getMedications).post(protecc, createMedication)
router.route('/:id').delete(protecc, deleteMedication).put(protecc, updateMedication)

module.exports = router

// const express = require('express');
// const router = express.Router()
// const {
//     registerUser,
//     loginUser,
//     getMe
// } = require('../controllers/userController');
// const { protecc } = require('../middleware/authMiddleware');

// router.post('/', registerUser);
// router.post('/login', loginUser);
// router.get('/me', protecc, getMe);

// module.exports = router;