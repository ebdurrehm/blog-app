
const data= require('../database/models/Data');

module.exports= async (req,res)=>{
    const posts= await data.find({"tags":{"$all":[req.params.tag]}});
    res.render('index_tag', {posts});
}