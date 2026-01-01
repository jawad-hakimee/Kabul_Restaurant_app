const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js');
const sendEmail = require('../utils/sendEmail.js');

const crypto = require('crypto');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (!user.isVerified) {
                return res.status(401).json({ message: 'Please verify your email address before logging in.' });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');

        const user = await User.create({
            name,
            email,
            password,
            verificationToken,
            isVerified: false
        });

        if (user) {
            // Send verification email
            try {
                const verificationUrl = `http://localhost:5173/verify-account?token=${verificationToken}`;
                await sendEmail({
                    email: user.email,
                    subject: 'Verify your account - Kabul Restaurant',
                    html: `
                        <h1>Verify Your Account</h1>
                        <p>Hi ${user.name},</p>
                        <p>Please click the link below to verify your email address:</p>
                        <a href="${verificationUrl}">${verificationUrl}</a>
                        <p>If you didn't create an account, please ignore this email.</p>
                    `
                });
            } catch (error) {
                console.error('Email send failed:', error);
                // Continue even if email fails, but ideal to warn user or retry
            }

            res.status(201).json({
                message: 'Registration successful! Please check your email to verify your account.'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Verify user account
// @route   GET /api/users/verify/:token
// @access  Public
const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Account verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { authUser, registerUser, verifyUser };
