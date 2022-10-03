const accountSid = process.env.MESSAGE_ID;
const authToken = process.env.MESSAGE_TOKEN;
const client = require( 'twilio' )( accountSid, authToken , {
    lazyLoading: true
} );


module.exports.sendCode = ( req,phone,code ) =>
    client.messages
        .create( {
            body: `Your code id: ${code}`,
            to: `+84${phone}`, // Text this number
            from: '+19289166336' // From a valid Twilio number
        } )
        .then(  message  => console.log( message ) )
        .catch( err => {
            throw new Error(req.t('Phone not support yet!'))
        } )

