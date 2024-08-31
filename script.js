require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to send an email
app.post('/send', async (req, res) => {
    const { name, email, comments ,contact ,gender ,state ,city ,pincode} = req.body;

    if (!name || !email || !comments) {
        return res.status(400).send({ error: 'Please provide name, email, and message.' });
    }

    // Create a transporter object using SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use other email services if needed
        auth: {
            user:"bt23cse242@shivalikcollege.edu.in", // Your email address from environment variable
            pass:process.env.EMAIL_PASS,  // Your email password or app password from environment variable
        },
    });

    console.log("env file:", process.env.EMAIL_USER);

    // Email options
    let mailOptions = {
        from: `${name} < ${email} >`, // The user's email
        to: process.env.EMAIL_USER, // Your email address (where you want to receive the emails)
        subject: 'New Form Submission',
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Contact:</strong> ${contact}</p>
               <p><strong>State:</strong> ${state}</p>
               <p><strong>City:</strong> ${city}</p>
               <p><strong>Pincode:</strong> ${pincode}</p>
               <p><strong>Gender:</strong> ${gender}</p>
               <p><strong>Message:</strong> ${comments}</p>`,
        replyTo: email, // Sets the reply-to to the user's email
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('SendMail Error:', error);
        res.status(500).send({ error: 'Failed to send email: ' + error.toString() });
    }
});

const PORT =8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
