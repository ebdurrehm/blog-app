var Data = require("../database/models/Data");
const User = require("../database/models/User");

module.exports=  async (req,res)=>{
    const posts = await Data.findOne({"slug":req.params.slug});
    res.render('article',{posts, comments: posts.comment.sort(function(a,b){
        return b.createdAt-a.createdAt;
      })})};
    