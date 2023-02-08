const fs = require('fs');
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

        const date = new Date();
        const dateUploaded = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;

        // const stats = fs.statSync(path.join(path.dirname(__dirname) + `/uploaded/video/${fileName}`));
        // const fileSizeInBytes = stats.size;
        // const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
        // let size = `${fileSizeInMegabytes.toFixed(2)} MB`;
        // console.log(size);

        videos.push({ fileName, userId: user.id, title, dateUploaded, time });
        writeFile('videos.json', videos);
        res.redirect('/admin');
    },
    GET_VIDEOS: (req, res) => {
        let videos = readFile('videos.json').filter(v => v.userId === verify(req.params.token).id);
        res.send(JSON.stringify(videos));
    },
    UPDATE_TITLE: (req, res) => {
        let videos = readFile('videos.json');
        videos.forEach(video => {
            if (video.fileName === req.params.fileName) {
                video.title = req.body.title;
            }
        });
        writeFile('videos.json', videos);
        res.redirect('back');
    },
    DELETE_VIDEO: (req, res) => {
        let videos = readFile('videos.json');
        videos.forEach((video, index) => {
            if (video.fileName === req.params.fileName) {
                videos.splice(index, 1);
            }
        });
        writeFile('videos.json', videos);
        res.redirect('back');
    },
};

module.exports = Admin;