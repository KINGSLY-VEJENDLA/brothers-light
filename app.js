// 1. Import packages
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");


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


// 7. CONTACT FORM ROUTE  👈 PLACE YOUR CODE HERE

app.post("/send-message", async (req,res)=>{


    const {
        name,
        email,
        phone,
        message

    } = req.body;



    const transporter = nodemailer.createTransport({

        host:"smtpout.secureserver.net",

        port:465,

        secure:true,

        auth:{

            user:"info@brotherslight.in",

            pass:"BL!@#$1234"

        }

    });



    const mailOptions={

        from:"info@brotherslight.in",

        to:"info@brotherslight.in",

        replyTo:email,

        subject:"New Website Enquiry - Brothers Light",

        html:`

        <h2>New Client Enquiry</h2>

        <hr>

        <p><b>Name:</b> ${name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Phone:</b> ${phone}</p>

        <p><b>Message:</b> ${message}</p>

        `

    };



    try{

        await transporter.sendMail(mailOptions);


        res.render("pages/success");

    }


    catch(error){

        console.log(error);

        res.send("Unable to send enquiry.");

    }


});


// 8. Start server (keep this at the bottom)

app.listen(3000, ()=>{

    console.log("🚀 Server Running");
    console.log("👉 http://localhost:3000");

});