const path = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { readFile, writeFile } = require('../api/fs_api');

const Login = {
    GET: (req, res) => {
        res.sendFile(path.join(path.dirname(path.dirname(__dirname)) + '/client/login.html'));
    },
    POST: async (req, res) => {
        let loginUser = req.body;
        let username = loginUser.username.trim();
        let password = loginUser.password.trim();
        let users = readFile('users.json');

        let founded = users.find(u => u.username === username);
        if (!founded) return res.send(JSON.stringify({ msg: "This username is not registered" }));

        let result = await bcrypt.compare(password, founded.password);
        if (!result) return res.send(JSON.stringify({ msg: "Password is wrong" }));

        let token = jwt.sign({ id: founded.id }, process.env.SECRET_KEY, { expiresIn: '2h' });

        // req.session.isSignedIn = true;
        // req.session.token = token;
        
        res.cookie('token', token);
        res.redirect('/');
    }
};

module.exports = Login;