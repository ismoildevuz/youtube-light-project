const express = require('express');
const session = require('express-session');
const upload = require('express-fileupload');
const path = require('path');

// router
const RegisterRouter = require('./router/register.router');
const LoginRouter = require('./router/login.router');


require('dotenv').config();
const PORT = process.env.PORT || 4040;
const app = express();

app.use(express.static(path.join(path.dirname(__dirname) + '/client')));
app.use(express.json());
app.use(upload());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(RegisterRouter);
app.use(LoginRouter);






app.use('/admin', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname) + '/client/admin.html'));
});

app.listen(PORT, () => {
    console.log(`Port: ${PORT}. Server is running...`);
});