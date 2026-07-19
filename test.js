require("dotenv").config();

const nodemailer = require("nodemailer");

(async () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log("SMTP VERIFIED");
    } catch (err) {
        console.log(err);
    }
})();