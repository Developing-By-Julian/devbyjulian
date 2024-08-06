const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config()
const port = process.env.PORT || 3080;
const path = require("node:path")

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Stel de statische bestanden in (CSS, JS, afbeeldingen)
app.use(express.static(path.join(__dirname, 'public')));

// Route voor de homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Route voor de contactpagina
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/regels', (req, res) => {
    res.render('regels');
});


app.get('/projecten', (req, res) => {
    res.render('portfolio/projects');
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
            'Reply-To': "reply@developingbyjulian.nl"
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

// app.get("/schakelsim", (req, res) => {
//     res.render("schakelsim")
// })
// app.get("/schakelsimtest", (req, res) => {
//     res.render("schakelsimtest")
// })


// app.get("/me/sendMail", (req, res) => {
//     const web_key = req.query.key
//     const fetch_key = process.env.KEY

//     if (web_key === fetch_key) {
//         res.render("sendMail")
//     } else {
//         res.redirect("/")
//     }
// })
// const nodemailer = require("nodemailer")
// app.post("/me/sendMail", (req, res) => {
//     const { to, subject, text, KEY } = req.body

//     if (!KEY === process.env.KEY) {
//         return res.redirect("/")
//     }

//     let transporter = nodemailer.createTransport({
//         host: "smtp.hostnet.nl",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.SMPT_email,
//             pass: process.env.SMPT_Password,
//         },
//     })

//     let mailOptions = {
//         from: "noreply@developingbyjulian.nl",
//         to: to,
//         subject: subject,
//         text: text,
//         headers: {
//             'Reply-To': "contact@developingbyjulian.nl"
//         }
//     };


//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//            return res.send('<script>alert("Mislukt! Druk op ok om terug te gaan."); window.location.href = "/me/sendMail";</script>');
//         }
//         console.log(info);
//         return res.send('<script>alert("Gelukt! Druk op ok om terug te gaan."); window.location.href = "/me/sendMail";</script>');
//     })

//     // transporter.verify(function(error, success) {
//     //     if (error) {
//     //         console.log('SMTP connection error:', error);
//     //     } else {
//     //         console.log('SMTP connection successful');
//     //     }
//     // });
// })

app.get('/api/status', (req, res) => {
    res.status(200).json([
        { id: 1, name: "Oke!" },
    ]);
});
app.listen(port, "0.0.0.0", function () {
    console.log(`Server is running on http://localhost:${port}`);
});

let client = require("./bot/bot")
client.login(process.env.TOKEN)