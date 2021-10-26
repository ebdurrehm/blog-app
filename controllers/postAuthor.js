var Author = require('../database/models/Author');

module.exports =(req, res)=>{
    Author.create(req.body,(err, post)=>{
        res.redirect('/blog');
    })
}