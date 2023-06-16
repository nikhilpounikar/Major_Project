const User = require("../models/User");

module.exports.profile = function (req, res) {
  // return res.send('<h1>You are on profile</h1>');
  try {
    console.log("Cookies",req.cookies);
    if (req.cookies.user_id) {
      //find the user
      User.findOne({ _id: req.cookies.user_id })
        .then((user) => {
          // console.log(user);
          // if user found
          if (user != null && user != undefined) {
            //if password doesn't match
            //console.log(user,req.body);
            console.log("user profile",user);
            return res.render("profile", {
              title: "Profile",
              user: user,
            });
          } else {
            // handle user not found
            console.log("User Not Found");
            return res.redirect("/user/sign-in");
          }
        })
        .catch((err) => {
          // handle error finding user
          console.log("Error Finding User", err);
          return res.redirect("/user/sign-in");
        });
    } else {
      return res.redirect("/user/sign-in");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/user/sign-in");
  }
};

module.exports.signUp = function (req, res) {
  // return res.send('<h1>You are on profile</h1>');

  return res.render("user_sign_up", {
    // person:"Taliq"
    title: "Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    // person:"Taliq"
    title: "Sign In",
  });
};

// creates the users
module.exports.create = function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => {
            console.log("Object saved successfully:");
            return res.redirect("/user/sign-in");
          })
          .catch((err) => {
            console.error(err);
            return res.redirect("back");
          });
      } else {
        console.log("User Already Exists");
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error Finding User", err);
      return res.redirect("back");
    });
};

module.exports.createSession = function (req, res) {
  //find the user
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      // if user found
      if (user != null && user != undefined) {
        //if password doesn't match
        console.log(user, req.body);
        if (user.password != req.body.password) {
          return res.redirect("back");
        }

        // handle session Creation
        res.cookie("user_id", user.id);

        return res.redirect("/user/profile");
      } else {
        // handle user not found
        console.log("User Not Found");
        return res.redirect("back");
      }
    })
    .catch((err) => {
      // handle error finding user
      console.log("Error Finding User", err);
      return res.redirect("back");
    });
};
