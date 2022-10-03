const mongoose = require( 'mongoose' );

const chatSchema = new mongoose.Schema( {
    message:{
        type:String,
        required:'Message is required'
    },
    unsent:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },
    _uid:{
        type:mongoose.Schema.Types.ObjectId,
        required:'User id is required'
    },
    _mids:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
} )  


module.exports = mongoose.model( 'Chat',chatSchema );