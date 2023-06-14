module.exports.home = function(req,res){

   console.log(req.cookies);
   res.cookie('user_id',17);
   return res.render('home',{

    title:"Views",
    person:"Lucky"
   })
}