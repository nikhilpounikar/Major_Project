const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

var opts ={

    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret',
}

passport.use(new jwtStrategy(opts, async function(jwt_payload, done) {

    try {
        let user = await User.findOne({id: jwt_payload.sub});

        if(!user){
            return done(null, false);
        }

        return done(null, user);
       
    } catch (error) {
        console.log("Error in passport jwt");
        return done(error,false);
    }
   
}));

module.exports = passport;