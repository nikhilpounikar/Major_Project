module.exports.index = function(req,res){

    return res.json(200,{

        message:'Data fetched via API',
        posts:[]
    })
    
}