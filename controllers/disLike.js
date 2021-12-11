const Data = require('../database/models/Data');

module.exports = async (req, res) => {

    return await Data.findOneAndUpdate({ 'comment._id': req.query.id }, {
        '$set': {
            'comment.$.dislike': req.query.count
        }
    }, (err, post) => {
        if (!err) { res.json(post); }
        else {
            console.log(err);
        }


    });



}