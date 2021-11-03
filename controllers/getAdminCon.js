const data =require('../database/models/Data');
module.exports=async(req,res)=>{
    var query = req.query.search;
    
    

    var stsrquery= query+"";
    let post = await data.findOne({"title":{"$regex":stsrquery}});
  
   if(req.query.content !==undefined){
    
    var contents= req.query.content;
    post.content = contents;
post.save((error, post)=>{
    console.log("updated");
})
}
        if(req.session.userId){
            res.render('dashboard', {query:query, post:post});
        }
    
        else{
            res.send("Permission denied");
        }
    
}