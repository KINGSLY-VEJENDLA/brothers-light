// 1. Import packages
require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const axios = require("axios");

// 2. Create app
const app = express();

const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

// 3. Middleware
app.use(express.urlencoded({ extended: true }));


// 4. Static files
app.use(express.static(path.join(__dirname, "public")));


// 5. EJS setup
app.set("view engine", "ejs");


// 6. Home page route
app.get("/", (req,res)=>{

    res.render("pages/index", {
        title:"Brother's Light Enterprise Solutions"
    });

});


app.post("/send-message", async (req, res) => {

    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
    return res.status(400).send("All fields are required.");
}

    try {

    console.log("1. Form received");

    const token = req.body["cf-turnstile-response"];

    if (!token) {
        return res.status(400).send("Please complete the security verification.");
    }

    console.log("2. Verifying Turnstile...");

    const verification = await axios.post(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET,
            response: token,
            remoteip: req.ip
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    console.log("3. Turnstile:", verification.data);

    if (!verification.data.success) {
        return res.status(400).json(verification.data);
    }

    

    const mailOptions = {
        from: `"Brothers Light" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: "New Website Enquiry - Brothers Light",
        html: `
            <h2>New Client Enquiry</h2>
            <hr>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Message:</b> ${message}</p>
        `
    };

    console.log("7. Sending email...");
    await transporter.sendMail(mailOptions);

    await transporter.sendMail({
    from: `"Brothers Light" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We've received your enquiry",
    html: `
        <h2>Thank You!</h2>
        <p>Dear ${name},</p>

        <p>Thank you for contacting Brothers Light.</p>

        <p>We have received your enquiry and will get back to you within 24 hours.</p>

        <br>

        <b>Brothers Light</b>
    `
});

    console.log("8. Email sent successfully");

    return res.render("pages/success");

} catch (error) {

    console.error("========== ERROR ==========");
    console.error(error);

    if (error.response) {
        console.error(error.response.data);
    }

    return res.status(500).send("Something went wrong. Please try again.");
}

});


// 8. Start server (keep this at the bottom)

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server Running`);
    console.log(`Local:   http://localhost:${PORT}`);
    console.log(`Network: http://YOUR-IP:${PORT}`);
});
app.get("/privacy-policy", (req, res) => {
    res.render("pages/privacy", {
        title: "Privacy Policy | Brothers Light"
    });
});