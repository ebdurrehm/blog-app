var data=require('../database/models/Data');

module.exports= async(req,res)=>{
    var id={"_id": req.params.id};
    await data.findOneAndDelete(id,(err, post)=>{
        if(err) res.send(err);
        res.send("The post was deleted successfully!");
    })
}