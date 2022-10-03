const authController = require('../controllers/auth.controller')

module.exports = require('express').Router()
  .post( '/login',authController.login )
  .post('/register',authController.register);