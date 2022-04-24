var User = require("../database/models/User");

module.exports = (req, res)=>{
    if(req.body.isAdmin){
        req.body.isAdmin = true;
    }
    User.create(req.body, (error, user)=>{
        console.log(req.body)
       if(error){
        console.log(error);

        // const registrationErrors = Object.keys(error.errors).map(key=>error.errors[key].message);
        // req.flash('registrationErrors',registrationErrors);
           return  res.redirect('/user/register');
           
       }
       req.session.userId =user._id;
       req.session.isAdmin=user.isAdmin;
       console.log(req.session)
       res.redirect("/");
    })
}
