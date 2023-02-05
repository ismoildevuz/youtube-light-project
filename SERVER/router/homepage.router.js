const express = require('express');
const HomePageController = require('../controller/homepage.controller');

const router = express.Router();
router
    .get('/', HomePageController.GET)
    .get('/channels', HomePageController.GET_CHANNELS)
    .get('/channels/:userId', HomePageController.GET_CHANNEL)
    .get('/videos', HomePageController.GET_VIDEOS)
    .get('/admin/:token', HomePageController.GET_USER)
    .get('/get-video-size/:fileName', HomePageController.GET_SIZE)
module.exports = router;