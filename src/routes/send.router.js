const sendController = require('../controllers/send.controller')


module.exports = require('express').Router()
  .post( '/',sendController.sendMessage )