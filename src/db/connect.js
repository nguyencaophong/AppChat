const mongoose = require('mongoose')
const { info, error } = require('console')

mongoose.connect(process.env.MONGODB)
  .then(() => info('Connected Database successfully!'))
  .catch(err => error('Could not connect', err))
