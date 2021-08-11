const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// models
const User = require('./models/user')

mongoose.connect('YOUR_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected Successfully'))
.catch(err => console.log("connection compromised", err))

//express initailazation
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ Msg: "Welcome" })
})

// This code handles the post request sent from the signup form
app.post('/auth/signup', (req, res) => {
    const { firstname, lastname, phone, email } = req.body
    User.create({
        firstname,
        lastname,
        phone,
        email
    })
    .then(user => {
        console.log("Accounted has been created successfully: ", user)
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})