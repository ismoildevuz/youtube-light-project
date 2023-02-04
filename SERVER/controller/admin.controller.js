const path = require('path');
const uuid = require('uuid');
const { verify } = require('../api/jwt_api')
const { readFile, writeFile } = require('../api/fs_api');

const Admin = {
    GET: (req, res) => {
        res.sendFile(path.join(path.dirname(path.dirname(__dirname)) + '/client/admin.html'));
    },
    POST: async (req, res) => {
        let user = verify(req.cookies.token);
        let title = req.body.title.trim();
        let videos = readFile('videos.json');

        let file = req.files.upload_video;
        let fileName = uuid.v4() + path.extname(file.name);
        file.mv('./uploaded/video/' + fileName);

        videos.push({ fileName, userId: user.id, title });
        writeFile('videos.json', videos);
        res.redirect('/admin');
    }
};

module.exports = Admin;