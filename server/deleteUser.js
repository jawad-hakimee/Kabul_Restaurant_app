const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const deleteUser = async () => {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address. Usage: node deleteUser.js <email>');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        await User.deleteOne({ _id: user._id });
        console.log(`User ${user.name} (${email}) deleted successfully.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

deleteUser();
