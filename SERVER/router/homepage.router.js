const express = require('express');
const HomePageController = require('../controller/homepage.controller');

const router = express.Router();
router
    .get('/', HomePageController.GET)
    .get('/channels', HomePageController.GET_CHANNELS)
    .get('/channels/:userId', HomePageController.GET_CHANNEL)
    .get('/admin/:token', HomePageController.GET_USER)
    .get('/get-video-size/:fileName', HomePageController.GET_SIZE)
    .get('/videos', HomePageController.GET_VIDEOS)
    .post('/search-videos', HomePageController.SEARCH_PAGE)
    .get('/search-videos/:searchByTitle', HomePageController.SEARCH_VIDEOS)
module.exports = router;