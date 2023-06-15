const User = require('../models/User');

module.exports.profile = function(req,res){

    // return res.send('<h1>You are on profile</h1>');

    return res.render('profile',{

        person:"Taliq"
    })
}

module.exports.signUp = function(req,res){

    // return res.send('<h1>You are on profile</h1>');

    return res.render('user_sign_up',{

       // person:"Taliq"
       title:"Sign Up"
    })
}

module.exports.signIn = function(req,res){


    return res.render('user_sign_in',{

       title:"Sign In"
    })
}

// creates the users
module.exports.create = function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    User.findOne({ "email": req.body.email })
      .then((user) => {
        if (!user) {
          User.create(req.body)
            .then((user) => {
              console.log('Object saved successfully:');
              return res.redirect('/user/sign-in');
            })
            .catch((err) => {
              console.error(err);
              return res.redirect('back');
            });
        } else {
          console.log("User Already Exists");
          return res.redirect('back');
        }
      })
      .catch((err) => {
        console.log("Error Finding User", err);
        return res.redirect('back');
      });
  };
  

module.exports.createSession = function(req,res){

    // return res.send('<h1>You are on profile</h1>');

    // return res.render('user_sign_in',{

    //    // person:"Taliq"
    //    title:"Sign In"
    // })

    return res.redirect('back');
}
