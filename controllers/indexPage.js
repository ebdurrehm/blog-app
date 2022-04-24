const Data = require("../database/models/Data");

module.exports = async (req, res)=>{

    let page= typeof req.query.page !=="undefined"?req.query.page:1;
    page= parseInt(page);
    const limit = 5;
    let startIndex = (page-1)*limit;
    let endIndex = page*limit;
    const posts = await Data.find({}).skip(startIndex).limit(limit).sort({date:-1});
    // const id = req.session.userId;
    // const isAdmin = req.session.isAdmin;
   
    console.log(req.session)
    // console.log(`${id} ${isAdmin}`)
    res.render("index",{posts});   
};

