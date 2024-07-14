const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
require("dotenv").config()
// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/projecten', (req, res) => {
    res.render('projects');
});
app.get("/portfolio/wheater", (req, res) => {
    res.render("portfolio/wheater")
})
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.hostnet.nl",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMPT_email,
            pass: process.env.SMPT_Password,
        },
    })

    let mailOptions = {
        from: "noreply@developingbyjulian.nl",
        to: email,
        bcc: "contact@developingbyjulian.nl",
        subject: `${name} - ${email}`,
        text: message,
        headers: {
            'Reply-To': email
        }
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
           return res.send('<script>alert("Mislukt! Druk op ok om terug te gaan."); window.location.href = "/";</script>');
        }
        console.log(info);
        return res.send('<script>alert("Gelukt! Druk op ok om terug te gaan."); window.location.href = "/";</script>');
    })

});

app.get("/schakelsim", (req, res) => {
    res.render("schakelsim")
})
app.get("/schakelsimtest", (req, res) => {
    res.render("schakelsimtest")
})


app.get("/me/sendMail", (req, res) => {
    const web_key = req.query.key
    const fetch_key = process.env.KEY

    if (web_key === fetch_key) {
        res.render("sendMail")
    } else {
        res.redirect("/")
    }
})
const nodemailer = require("nodemailer")
app.post("/me/sendMail", (req, res) => {
    const { to, subject, text, KEY } = req.body

    if (!KEY === process.env.KEY) {
        return res.redirect("/")
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.hostnet.nl",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMPT_email,
            pass: process.env.SMPT_Password,
        },
    })

    let mailOptions = {
        from: "noreply@developingbyjulian.nl",
        to: to,
        subject: subject,
        text: text,
        headers: {
            'Reply-To': "contact@developingbyjulian.nl"
        }
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
           return res.send('<script>alert("Mislukt! Druk op ok om terug te gaan."); window.location.href = "/me/sendMail";</script>');
        }
        console.log(info);
        return res.send('<script>alert("Gelukt! Druk op ok om terug te gaan."); window.location.href = "/me/sendMail";</script>');
    })

    // transporter.verify(function(error, success) {
    //     if (error) {
    //         console.log('SMTP connection error:', error);
    //     } else {
    //         console.log('SMTP connection successful');
    //     }
    // });
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
