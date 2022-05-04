var User = require('../database/models/User');

module.exports= async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.status(200);
    res.render('user',{user});
 
}