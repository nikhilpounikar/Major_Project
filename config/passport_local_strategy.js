const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

//authentication using passprt
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          if (!user.verifyPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Eror Finding User ==> Passport");
          return done(err);
        });
    }
  )
);

// serialise the user to decide which key is to be kept in cookies
// it is responsible for managing the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialising the user key in cookie
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding the user ===> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

module.exports = passport;
