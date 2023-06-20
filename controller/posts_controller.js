const Post = require('../models/Post');
const Comment = require('../models/Comments');
module.exports.create = function(req,res){

    Post.create({

        content:req.body.content,
        user:req.user._id
    })
    .then((post)=>{

        console.log(post,"Created.");
        return res.redirect('back');
    })
    .catch((err)=>{

        console.log("error creating post ",err);
        res.redirect('back');
    })

};

module.exports.destoy = function(req,res){
    Post.findById({_id:req.params.id})
    .then((post)=>{

        if(post.user == req.user.id){
            Post.findByIdAndDelete({_id:post._id})
            .then(()=>{
                console.log("Post Delete Successfully");
            }).catch((err)=>{
                console.log('Error Deleting the Post',err);
            })
            
            Comment.deleteMany({post:post._id})
            .then(()=>{
                console.log("Comments Delete Successfully");
                return res.redirect('back');
            })
        }else{

            console.log('Invalid User, Your are not allowed to delete this post');
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log('Error finding post',err);
        return res.redirect('back');
    })
}