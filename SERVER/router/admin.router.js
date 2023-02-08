const express = require('express');
const AdminController = require('../controller/admin.controller');

const router = express.Router();
router
    .get('/admin', AdminController.GET)
    .post('/admin', AdminController.POST)
    .get('/admin/videos/:token', AdminController.GET_VIDEOS)
    .post('/admin/update_title/:fileName', AdminController.UPDATE_TITLE)
    .delete('/admin/delete_video/:fileName', AdminController.DELETE_VIDEO)
    .get('/logout/:check', AdminController.LOG_OUT)

module.exports = router;