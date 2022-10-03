const converter = require('../helpers/converter')
const checker = require('../helpers/checker')

module.exports = (err, req, res, next) => {
  let code = err.status || 500, msg = err.message || ''

  switch (err.name) {
    case 'ValidationError':
      code = 400
      msg = Object.values(err.errors).map((e, i) => (i + 1) + '. ' + (e)).join(';\n') + '!'
      break

    case 'JsonWebTokenError':
      code = 400
      break

    case 'TokenExpiredError':
      code = 401
      break

    case 'AxiosError':
      code = 501
      msg = err.response?.data?.response || err.response?.data || err.message
      break

    default:
      switch (err.code) {
        case 13:
          code = 501
          msg = 'Authentication database failed!'
          break

        case 11000:
          code = 422
          msg = converter.capitalize(Object.keys(err.keyValue)[0] + ' is taken!')
          break

        case 'ENOENT':
        case 'ENOTDIR':
        case 'ENOTEMPTY':
          code = 404
          msg = 'No such file or directory!'
          break

        case 'ECONNREFUSED':
          code = 503
          break

        default:
          try {
            console.log(err);
            return res.status(checker.isStatus(err?.code) ? err?.code : code).send(checker.isStatus(err?.code || code) ? converter.capitalize(msg) : err)
          } catch (err) {
            console.log(err);
            return res.status(checker.isStatus(err?.code) ? err?.code : code).send(checker.isStatus(err?.code || code) ? converter.capitalize(msg) : err)
          }
      }
  }
  console.log(err);
  return res.status(code).send(converter.capitalize(msg))
}