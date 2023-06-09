module.exports.profile = function(req,res){

    // return res.send('<h1>You are on profile</h1>');

    return res.render('profile',{

        person:"Taliq"
    })
}