const Post = require('../models/Post');

module.exports.create = function(req,res){

    Post.create({

        content:req.body.content,
        user:req.user._id
    })
    .then((post)=>{

        console.log(post,"Created.");
    })
    .catch((err)=>{

        console.log("error creating post ",err);
        res.redirect('back');
    })


};