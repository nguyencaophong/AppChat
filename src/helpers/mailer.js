const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.MAILER_KEY)

module.exports.sendCode = (req, address, title, code) => sgMail.send({
    from: `${process.env.NAME} <${process.env.MAILER_ADDR}>`,
    to: address,
    subject: title,
    html: `<a href="${process.env.WEB1}" style="color: blue; text-decoration: none;">
          <h1><img src="${process.env.LOGO}" alt="${process.env.NAME} Logo"> ${process.env.NAME}</h1>
          </a>
          <hr>
          <h2>${title}</h2>
          <p>${req.t('Verification code')}: ${code}</p>
          <hr>
          <h3><a href="${process.env.COM_HOME}" style="color: blue; text-decoration: none;">&copy; Copyright by ${process.env.COM_NAME} ${new Date().getFullYear()}</a><h3/>`
    })
    .then(() => {}, error => {
        if (error.response) {
            throw new Error('Email not support yet')
        }
  });