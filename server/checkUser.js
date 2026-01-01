const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkUser = async () => {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address. Usage: node checkUser.js <email>');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
        } else {
            console.log(`User found:`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`isVerified: ${user.isVerified}`);
            console.log(`verificationToken: ${user.verificationToken}`);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkUser();
