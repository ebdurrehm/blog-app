var Data = require('../database/models/Data');

module.exports = async (req,res)=>{
    let size= await Data.countDocuments({});
    res.json(size)
}