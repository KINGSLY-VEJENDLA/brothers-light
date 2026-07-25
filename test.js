require("dotenv").config();
const nodemailer = require("nodemailer");

async function test() {
  try {
    console.log("EMAIL:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    await transporter.verify();
    console.log("✅ SMTP Verified");
  } catch (err) {
    console.error(err);
  }
}

test();