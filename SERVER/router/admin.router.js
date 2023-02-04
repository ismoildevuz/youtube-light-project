const express = require('express');
const AdminController = require('../controller/admin.controller');

const router = express.Router();
router
    .get('/admin', AdminController.GET)
    .post('/admin', AdminController.POST)

module.exports = router;