const Data = require('../database/models/Data');

module.exports = async (req, res) => {
    // await Data.findById(req.params.id,(err,post)=>{
    //     let comment = post.comment;
    //     res.json(comment[comment.length-1]);
    // })

    return await Data.findOneAndUpdate({ 'comment._id': req.query.id }, {
        '$set': {
            'comment.$.like': req.query.count
        }
    }, (err, post) => {
        if (!err) { res.json(post); }
        else {
            console.log(err);
        }


    });



}

