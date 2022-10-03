const EmailSchema = require( '../schemas/email.schema' )

module.exports = () => setTimeout( () => EmailSchema.find()
    .then( emails => emails
        .filter( v => Date.now() > new Date( v.createdAt ).getTime() + 10 * 60 * 1000 )
        .forEach( v => v.remove() ) )
, 10 * 60 * 1000 )
