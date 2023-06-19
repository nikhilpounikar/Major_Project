const Post = require('../models/Post');
const Comment = require('../models/Comments');

module.exports.create = function(req,res){

    console.log("logging post id",req.body.post);
    Post.findById({_id:req.body.post})
    .then((post)=>{

        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            .then((comment)=>{
        
                console.log(comment,"Created.");
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            })
            .catch((err)=>{
        
                console.log("error creating Comments ",err);
                res.redirect('back');
            })
        }else{
            console.log("Post Not Found");
            res.redirect('back');
        }
       

    }).catch((err)=>{

        console.log("error creating post ",err);
        res.redirect('back');
    })
    


};