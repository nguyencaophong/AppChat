const mongoose = require( 'mongoose' );

const feedbackSchema = new mongoose.Schema( {
    body:{
        type:String,
        required:'Body is required'
    },
    unsent:Boolean,
    _uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'User id is required' 
    }
} )  


module.exports = mongoose.model( 'FeedBack',feedbackSchema );