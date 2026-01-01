const express = require('express');
const router = express.Router();
const { authUser, registerUser, verifyUser } = require('../controllers/userController.js');

router.post('/login', authUser);
router.post('/', registerUser);
router.get('/verify/:token', verifyUser);

module.exports = router;
