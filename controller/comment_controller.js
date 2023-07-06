const Post = require('../models/Post');
const Comment = require('../models/Comments');
const commentsMailer = require('../mailers/comments_mailer');
const User = require('../models/User');

module.exports.create1 = async function(req,res){

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

                comment.populate('user', 'name email').execPopulate()
                .then((newComment)=>{
                    console.log('New comment populated ',newComment);
                    commentsMailer.newComment(newComment);
                }).catch((err)=>{
        
                    console.log("error creating Comments ",err);
                    res.redirect('back');
                });

                
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

module.exports.create = async function(req, res){

    console.log("Inside Creating comment");

    try{
        let post = await Post.findById(req.body.post);
       
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            //comment = await U.populate('user', 'name email').execPopulate();
            let user = await User.findById({_id:comment.user});

            if(user){
                console.log('New comment populated ',comment);
                commentsMailer.newComment(comment,user.email);
            }
            
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

module.exports.destroy =  function(req,res){

    Comment.findById({_id:req.params.id})
    .then((comment)=>{

        if(comment.user == req.user.id){

            Post.findByIdAndUpdate(comment.post,{$pull:{'comments':comment.id}})
            .then(()=>{
                console.log('Comments Removed From Post Removed');

                Comment.findByIdAndDelete(comment.id)
                .then(()=>{
                    console.log('Comments Deleted...');
                    return res.redirect('back');
                })
                .catch((err)=>{
                    console.log('Error Deleting Comment  : ',err);
                    return res.redirect('back');
                })
            })
            .catch((err)=>{
                console.log('Error Deleting Comment from Post : ',err);
                return res.redirect('back');
            })


        }else{
            console.log('Not Authorised to delete this Comment');
            return res.redirect('back');
        }

    })
    .catch((err)=>{
        console.log('Error Finding Comment : ',err);
        return res.redirect('back');
    })

}