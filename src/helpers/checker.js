module.exports.isCode = value => /^\d{6}$/.test(value)

module.exports.isEmail = value => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)

module.exports.isPhone = value => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)

module.exports.isUsername = value => /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value)

module.exports.isStrongPassword = value => /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)

module.exports.isDate = (year, month, day, date = new Date(parseInt(month) + 1 + '/' + day + '/' + year)) => date.getFullYear() === parseInt(year) && date.getMonth() === parseInt(month) && date.getDate() === parseInt(day)

module.exports.isStatus = value => /^[1-5][0-9][0-9]$/ig.test(value)

module.exports.isUrl = value => /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(value)
