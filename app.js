const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
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

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.send('Contact form submitted!');
});

app.get("/schakelsim", (req, res) => {
res.render("schakelsim")
})
app.get("/schakelsimtest", (req, res) => {
    res.render("schakelsimtest")
    })
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
