const express = require('express');
const RegisterController = require('../controller/register.controller');

const router = express.Router();
router
    .get('/register', RegisterController.GET)
    .post('/register', RegisterController.POST)

module.exports = router;