const Message = require('../models/message.model');
const Chat = require('../models/chat.model');

module.exports.sendMessage = async( req,res,next ) =>{
    const {body,unsent,_uid,_cid,message,lang} = req.body;
    try {
        await req.i18n.changeLanguage( lang );
        const newMessage = await new Message(
            undefined,
            body,
            unsent,
            _uid,
            _cid
        ).create();

        const newChat = await new Chat(
            undefined,
            message,
            undefined,
            _uid,
            newMessage._id
        ).create();

        await new Message(
            newMessage._id,
            body,
            unsent,
            _uid,
            newChat._id
        ).update();

        res.status( 201 ).send( req.t( 'Send message success' ) );
    } catch ( error ) {
        next( error )
    }
}