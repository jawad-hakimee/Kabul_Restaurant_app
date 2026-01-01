const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    let transporter;

    // Check if using placeholder credentials
    if (process.env.EMAIL_USER === 'your_user' || !process.env.EMAIL_USER) {
        // Create a test account (Ethereal)
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    } else {
        // Use provided credentials
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // Define the email options
    const mailOptions = {
        from: 'Kabul Restaurant <no-reply@kabulrestaurant.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    // Actually send the email
    const info = await transporter.sendMail(mailOptions);


    // If using Ethereal, log the preview URL
    if (nodemailer.getTestMessageUrl(info)) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};

module.exports = sendEmail;
