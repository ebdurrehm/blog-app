var Data = require("../database/models/Data");


module.exports=  async (req,res)=>{
    const posts = await Data.findOne({"slug":req.params.slug});
    
    res.render('article',{posts, user:req.user, comments: posts.comment.sort(function(a,b){
        return b.createdAt-a.createdAt;
      })})};
    