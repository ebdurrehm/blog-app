var Data = require("../database/models/Data");
const User = require("../database/models/User");

module.exports=  async (req,res)=>{
    const posts = await Data.findOne({"slug":req.params.slug});
    const user = await User.find({});
    res.render('article',{posts,user})};
    