const Post = require("../models/Post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',17);
  // return res.render('home',{

  //  title:"Views",
  //  person:"Lucky"
  // })

  Post.find({})
    .populate("user")
    .populate({
      // fetching all comments related to the post
      path:'comments',
      populate:{
        // fetching all the user who have made comment on the purticular post
        path:'user'
      }
    })
    .exec()
    .then((posts) => {
      return res.render("home", {
        title: "Project | Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("Error Fetching Post",err);
      return res.redirect("/user/sign-in");
    });
};
