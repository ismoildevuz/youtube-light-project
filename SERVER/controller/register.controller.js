const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcryptjs')
const { readFile, writeFile } = require('../api/fs_api');

const Register = {
    GET: (req, res) => {
        res.sendFile(path.join(path.dirname(path.dirname(__dirname)) + '/client/register.html'));
    },
    POST: async (req, res) => {
        let newUser = req.body;
        let username = newUser.username.trim();
        let password = newUser.password.trim();
        let users = readFile('users.json');

        let salt = await bcrypt.genSalt(10);
        let hashedPsw = await bcrypt.hash(password, salt);
        password = hashedPsw;

        let userExist = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (userExist) return res.send(JSON.stringify({ msg: 'This username is already taken' }));

        let file = req.files.upload_image;
        let fileName = uuid.v4() + path.extname(file.name);
        file.mv('./uploaded/avatar/' + fileName);

        users.push({ id: uuid.v4(), avatar: fileName, username, password });
        writeFile('users.json', users);
        res.redirect('/login');
    }
};

module.exports = Register;