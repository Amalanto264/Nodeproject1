const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const LocalStrategy = require('passport-local').Strategy

exports.initializePassport = (passport)=>{
    const authenticateUser = async(email, password, done)=>{
        const user = await User.findOne({email:email})
        console.log(user)

        if(!user){
            console.log('user not found')
            return done(null,false,{message:'user not found'})
        }

        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null, user)
            }else{
                console.log('password mismatch')
                return done(null, false,{message:'password mismatch'})
            }

        } catch(error) {
            return done(error)

        }

        if(user===null){

        }

    }

    passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"},authenticateUser))

    passport.serializeUser((user,done)=>{done(null, user.id)})
    passport.deserializeUser(async(id,done)=>{

    try{
        const user = await User.findById({_id})
        done(null, user.id)

    } catch(error){
        done(error, false)

    }
})

}
