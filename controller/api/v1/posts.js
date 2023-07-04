const Post = require("../../../models/Post");
const Comment = require("../../../models/Comments");

module.exports.index = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        // fetching all comments related to the post
        path: "comments",
        populate: {
          // fetching all the user who have made comment on the purticular post
          path: "user",
        },
      });

    return res.status(200).json(200, {
      message: "Data fetched via API",
      posts: posts,
    });

    // let users = await User.find({});

    // return res.render("home", {
    //   title: "Project | Home",
    //   posts: posts,
    //   all_users: users,
    // });
  } catch (err) {
    console.log("Error in home controller : ", err);
  }
};

module.exports.destoy = async function (req, res) {
  try {
    let post = await Post.findById({ _id: req.params.id });

    //if (post.user == req.user.id) {
    await Post.findByIdAndDelete({ _id: post._id });

    //  console.log("Post Delete Successfully");

    await Comment.deleteMany({ post: post._id });

    return res.status(200).json({
      message: "Post and Comments associated deleted.",
    });

    //   console.log("Comments Delete Successfully");
    // } else {
    //   console.log("Invalid User, Your are not allowed to delete this post");
    // }
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};
