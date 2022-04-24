const Data = require('../database/models/Data');

module.exports = (req, res)=>{
    Data.updateOne({
    _id: req.body.id,
    }, 
    {"$push":{"comment":{
        name: req.body.name,
        email: req.body.email,
        text: req.body.text
    }}
}, (err, result)=>{
    res.json(result)
})

}