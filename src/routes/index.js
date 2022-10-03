
module.exports = api => api
  .use('/messages', require('./send.router'))
  .use('/auth',require('./auth.router'))
  
