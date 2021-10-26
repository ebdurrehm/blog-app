var Data = require("../database/models/Data");

module.exports = async (req, res)=>{
    const posts = await Data.find({}).sort({date:-1});
    res.render("index",{posts});
};