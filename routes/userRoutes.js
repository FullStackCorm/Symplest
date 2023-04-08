const express = require('express');
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/userController');
const { protecc } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protecc, getMe);

module.exports = router;