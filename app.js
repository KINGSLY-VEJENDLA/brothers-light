// 1. Import packages
require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const axios = require("axios");

// 2. Create app
const app = express();


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

    try {

        // Verify Cloudflare Turnstile
        const token = req.body["cf-turnstile-response"];

        if (!token) {
            return res.status(400).send("Please complete the security verification.");
        }

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

        if (!verification.data.success) {
            console.log(verification.data);
            return res.status(400).send("Security verification failed.");
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
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

        // Send email
        await transporter.sendMail(mailOptions);

        res.render("pages/success");

    } catch (error) {

        console.error("ERROR:", error.response?.data || error);

        res.status(500).send("Unable to send enquiry.");

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