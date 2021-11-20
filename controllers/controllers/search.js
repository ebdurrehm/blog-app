var data = require('../database/models/Data');

module.exports = async (req, res) => {
    console.log(req.body);
    console.log(req.query);
    console.log(req.query.keyword);
    let posts = await data.find({ "title": { "$regex": req.query.keyword, "$options": "i" } });
    res.json(posts)
}
