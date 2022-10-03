
const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jsonwebtoken' )

const userSchema = new mongoose.Schema( {
    username:{
        type:String,
        required:'User name is required',
        unique:true
    },
    password:{
        type:String,
        required:'Password is required'
    }
},{
    timestamps:true
} )  

// ** hash password
userSchema.pre( 'save', async function ( next ) {
    this.password && ( this.password = await bcrypt.hash( this.password, await bcrypt.genSalt( 10 ) ) )
    next()
} )

//#region Methods
userSchema.methods.authenticate = function ( password ) {
    return bcrypt.compareSync( password, this.password )
}

userSchema.methods.sign = function () {
    return jwt.sign( { _id: this._id, username: this.username}, process.env.SECRET, { expiresIn: process.env.JWT_EXP } )
}

module.exports = mongoose.model( 'User',userSchema );