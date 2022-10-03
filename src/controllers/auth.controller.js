const userSchema = require('../schemas/user.schema');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.login = async(req,res,next) => {
    try {
        await passport.authenticate('local',async (err,user,infor) => {
            if(err) {
                next(err)
                console.log('T');
            }
            req.session.cookie.expire = 60*60*24
            req.session.jwt = user.sign()
            // ** assign cookie
            await res
            .cookie('username', 'fsdsfd', { expires: new Date(Date.now() + 900000), httpOnly: true })
            .cookie('username', user._id.toString(), { expires: new Date(Date.now() + 900000), httpOnly: true })
            .send()
        })
    }
    catch(err) {
        next(err)
    }
}

module.exports.register = async(req,res,next) =>{
    try {
        const {username,password} = req.body;
        await new User(
            undefined,
            username,
            password
        ).create();
        res.status(201).send('Register account successfullly!');
    } catch (err) {
        next(err)
    }
}

