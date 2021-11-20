const data =require('../database/models/Data');
module.exports=async(req,res)=>{

    let post = await data.findOne({"slug":req.params.slug});
   console.log(post);
    var contents= req.body.content;
    post.content = contents;
post.save((error, post)=>{
    res.json(post);
    console.log("updated");
})


    
     
    
}