const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/contactController.js');

router.post('/', createMessage);

module.exports = router;
