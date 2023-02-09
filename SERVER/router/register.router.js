const express = require('express');
const RegisterController = require('../controller/register.controller');
const { RegisterValidate } = require('../middlewares/register');

const router = express.Router();
router
    .get('/register', RegisterController.GET)
    .post('/register', RegisterValidate, RegisterController.POST)

module.exports = router;