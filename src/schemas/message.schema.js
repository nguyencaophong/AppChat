const mongoose = require( 'mongoose' );

const messageSchema = new mongoose.Schema( {
    body:{
        type:String,
        required:'Body is required'
    },
    unsent:{
        type:Boolean,
        required:'Unsent is required'
    },
    _uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'User id is required'
    },
    _cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required:'Chat id is required'
    }
} )  


module.exports = mongoose.model( 'Message',messageSchema );