var User = require('../database/models/User');
var bcrypt = require('bcrypt');

const compareUser = (req,res)=>{
    const {email,password}=req.body;//get all data that entered from frontend
//findOne(get only one data that match with entered email)
    User.findOne({usrEmail:email},(error,user)=>{
        if(error){
            //if any error has occur
            console.log("something went wrong in the login");
        }
        else{
            //otherwise compare password that user entered to encrypted password(come from database)
            bcrypt.compare(password, user.usrPassword,(error,correct)=>{
//if two passwords match, then:
                if(correct){
                    req.session.userId =user._id,
                    req.session.isAdmin=user.isAdmin; //assaign this user's id to session id and session belong to this user until destroyed
                    req.session.save();
                    res.redirect('/admin');
                }
                else{
            //if pasords don't match return login page
                    res.redirect('/blog/user/login');
                }
            })
        }
    })
}
module.exports = compareUser;