const Message = require('../models/Message.js');

// @desc    Create new message
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const newMessage = new Message({
        name,
        email,
        message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json(createdMessage);
};

module.exports = { createMessage };
