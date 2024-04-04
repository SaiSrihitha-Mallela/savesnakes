const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5500;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Endpoint to receive location data and send email
app.post('/sendLocation', (req, res) => {
    const { latitude, longitude } = req.body;

    console.log('in server send loca');

    // 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mallelasaisrihitha@gmail.com', // Replace with your Gmail email address
            pass: 'xprc pxmz cpcp itcz' // Replace with your app-specific password
        }
    });

    const mailOptions = {
        from: 'mallelasaisrihitha@gmail.com', // Replace with your Gmail email address
        to: 'honeymallela.sri@gmail.com', // Replace with the recipient's Gmail email address
        subject: 'User Location',
        text: `Latitude: ${latitude}\nLongitude: ${longitude}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            console.log(" in send email erri");
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Email sent:', info.response);
        console.log("got loca")
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




