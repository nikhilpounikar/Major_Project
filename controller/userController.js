const User = require("../models/User");

module.exports.profile = function (req, res) {
  // return res.send('<h1>You are on profile</h1>');
  /* Manual Authnetication */
  // try {
  //   console.log("Cookies", req.cookies);
  //   if (req.cookies.user_id) {
  //     //find the user
  //     User.findOne({ _id: req.cookies.user_id })
  //       .then((user) => {
  //         // console.log(user);
  //         // if user found
  //         if (user != null && user != undefined) {
  //           //if password doesn't match
  //           //console.log(user,req.body);
  //           return res.render("profile", {
  //             title: "Profile",
  //            user: user,
  //           });
  //         } else {
  //           // handle user not found
  //           console.log("User Not Found");
  //           return res.redirect("/user/sign-in");
  //         }
  //       })
  //       .catch((err) => {
  //         // handle error finding user
  //         console.log("Error Finding User", err);
  //         return res.redirect("/user/sign-in");
  //       });
  //   } else {
  //     return res.redirect("/user/sign-in");
  //   }
  // } catch (err) {
  //   console.log(err);
  //   return res.redirect("/user/sign-in");
  // }

  /* Passport authentication */

  User.findById(req.params.id)
    .then((user) => {
      return res.render("profile", {
        title: "Profile",
        profile_user: user,
      });
    })
    .catch((err) => {
      console.log("Error Getting User Details : ", err);
      return res.redirect("back");
    });
};

module.exports.update = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (req.params.id == user.id) {
      await User.findByIdAndUpdate(user.id, req.body);
      console.log("User Updated");
    } else {
      return res.status(401).send("UnAuthorised");
    }

    return res.redirect("back");
  } catch (error) {
    console.log("Error While Updating User Details : ", error);
    return res.redirect("back");
  }
};

module.exports.signUp = function (req, res) {
  // return res.send('<h1>You are on profile</h1>');

  //if user is already sign-in redirect to profile
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("user_sign_up", {
    // person:"Taliq"
    title: "Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  //if user is already sign-in redirect to profile
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("user_sign_in", {
    // person:"Taliq"
    title: "Sign In",
  });
};

// creates the users
module.exports.create = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);

      console.log("Object saved successfully:");
      return res.redirect("/user/sign-in");
    } else {
      console.log("User Already Exists");
    }

    return res.redirect("back");
  } catch (err) {
    console.log("Error Creating User : ", err);
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  // manual Authentication
  /* //find the user
   User.findOne({ email: req.body.email })
     .then((user) => {
       // if user found
       if (user != null && user != undefined) {
         //if password doesn't match
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
     }); */

  // passport authentication

  return res.redirect("/");
};

// responsible for sign-out
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error loging Out", err);
      return res.redirect("back");
    }
    return res.redirect("/");
  });
};
