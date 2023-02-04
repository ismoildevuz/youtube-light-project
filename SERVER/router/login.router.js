const express = require('express');
const LoginController = require('../controller/login.controller');

const router = express.Router();
router
    .get('/login', LoginController.GET)
    .post('/login', LoginController.POST)

module.exports = router;