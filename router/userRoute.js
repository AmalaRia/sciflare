const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const User = require('../controllers/userController')
const Verify = require('../helpers/verification')
Router.use(express.json()); // for parsing application/json
Router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

Router.post('/userRegister',User.userRegister)
Router.post('/userLogin',User.userLogin)
Router.post('/UserDetails',User.UserDetails)


module.exports = Router