const path = require('path')
const express = require('express');
const authRouter = require('./routes/auth.router')

// Environment Variables
require('dotenv').config()

const api = express();
const PORT = process.env.PORT || 7004
const session = {
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {},
	store: require('connect-mongo').create({ mongoUrl: process.env.MONGODB, crypto: process.env.SECRET })
}

// Database
require('./db/connect')

// Middlewarzes
api.use(express.text())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(require('cookie-parser')(process.env.SECRET))
api.use(require('express-session')(session))


// Routes
require('./routes')(api)

// Error handle
api.use(require('./middlewares/handler.middleware'))


// Start server
api.listen(PORT, () => {
    console.log('Server running on: http://localhost:7004');
})
