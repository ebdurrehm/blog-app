const Data = require('../database/models/Data');

module.exports = async (req, res)=>{
    await Data.findById(req.params.id,(err,post)=>{
        let comment = post.comment;
        res.json(comment[comment.length-1]);
    })
   
}