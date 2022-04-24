const Data = require('../database/models/Data');
module.exports = async (req,res)=>{
    await Data.findOneAndUpdate({"_id":req.query.id}, {'$set':{"readCount": req.query.readCount}}, (err,post)=>{
        res.json(post);
    });
    
}