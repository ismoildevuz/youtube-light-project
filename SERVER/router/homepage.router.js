const express = require('express');
const HomePageController = require('../controller/homepage.controller');

const router = express.Router();
router
    .get('/', HomePageController.GET)
    .get('/homepage', HomePageController.HOME_PAGE)
    .get('/get_videos/:all', HomePageController.GET_VIDEOS)
    .get('/channels', HomePageController.GET_CHANNELS)
    .get('/channels-info/:userId', HomePageController.CHANNEL_INFO)
    .get('/channels/videos/:userId', HomePageController.CHANNEL_VIDEOS)
    .get('/admin/:token', HomePageController.GET_USER)
    .get('/get-video-size/:fileName', HomePageController.GET_SIZE)
    .get('/:userId', HomePageController.CHANNEL_PAGE)
    .post('/search-videos', HomePageController.SEARCH_PAGE)
    .get('/search-videos/:searchByTitle', HomePageController.SEARCH_VIDEOS)
module.exports = router;