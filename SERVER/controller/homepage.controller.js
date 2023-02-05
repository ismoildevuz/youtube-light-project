const fs = require('fs');
const path = require('path');
const { verify } = require('../api/jwt_api');
const { readFile, writeFile } = require('../api/fs_api');

const HomePage = {
    GET: (req, res) => {
        res.sendFile(path.join(path.dirname(path.dirname(__dirname)) + '/client/homepage.html'));
    },
    GET_CHANNELS: (req, res) => {
        let users = readFile('users.json').map(u => {
            return {
                id: u.id,
                avatar: u.avatar,
                username: u.username
            };
        });
        res.send(JSON.stringify(users));
    },
    GET_CHANNEL: (req, res) => {
        let userId = req.params.userId
        let user = readFile('users.json').map(u => {
            return {
                id: u.id,
                avatar: u.avatar,
                username: u.username
            };
        }).find(u => u.id === userId);
        res.send(JSON.stringify(user));
    },
    GET_VIDEOS: (req, res) => {
        let videos = readFile('videos.json');
        res.send(JSON.stringify(videos));
    },
    GET_USER: (req, res) => {
        let user = verify(req.params.token)
        let admin = readFile('users.json').map(u => {
            return {
                id: u.id,
                avatar: u.avatar,
                username: u.username
            };
        }).find(u => u.id === user.id);;
        res.send(JSON.stringify(admin));
    },
    GET_SIZE: async (req, res) => {
        const videoPath = path.join(path.dirname(__dirname) + `/uploaded/video/${req.params.fileName}`);
        await fs.stat(videoPath, (err, stats) => {
            if (err) {
                res.status(500).send('Error getting video size');
            }
            const sizeInBytes = stats.size;
            const sizeInMB = sizeInBytes / 1000000.0;
            res.send(JSON.stringify({ size: `${sizeInMB.toFixed(2)} MB` }));
        });
    }
};

module.exports = HomePage;