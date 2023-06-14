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

    // return res.send('<h1>You are on profile</h1>');

    return res.render('user_sign_in',{

       // person:"Taliq"
       title:"Sign In"
    })
}

// creates the users
module.exports.create = function(req,res){

    // return res.send('<h1>You are on profile</h1>');

    // return res.render('user_sign_in',{

    //    // person:"Taliq"
    //    title:"Sign In"
    // })

    return res.redirect('back');
}

module.exports.createSession = function(req,res){

    // return res.send('<h1>You are on profile</h1>');

    // return res.render('user_sign_in',{

    //    // person:"Taliq"
    //    title:"Sign In"
    // })

    return res.redirect('back');
}
