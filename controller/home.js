module.exports.home = function(req,res){

   return res.render('home',{

    title:"Views",
    person:"Lucky"
   })
}