const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

    try {

        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){

            return res.status(422).json({
                message:"Invalid Username or Password"
            })
        }

        return res.status(200).json({

            message:"Session Created.",
            data:{
                token:jwt.sign(user.toJSON(),'secret',{expiresIn:'10000'})
            }
        })
        
    } catch (error) {
        
        console.log("******Error Creating Session********",error);

        return res.status(500).json({
            message:"Interval Server Error"
        })
    }


}