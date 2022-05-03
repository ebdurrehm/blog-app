var Data = require("../database/models/Data");


module.exports=  async (req,res)=>{
    const posts = await Data.findOne({"slug":req.params.slug});
    //save post slug to the session object
    // that will be used to return the user to the article page
    // after auth callback invoke
    req.session.post_id=req.params.slug;
    req.session.save();
    res.render('article',{posts, user:req.user, comments: posts.comment.sort(function(a,b){
        return b.createdAt-a.createdAt;
      })})};
    