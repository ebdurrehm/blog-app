var User = require("../database/models/User");

module.exports = (req, res)=>{
    User.create(req.body, (error, user)=>{
        console.log(req.body)
       if(error){
        console.log(error)
        const registrationErrors = Object.keys(error.errors).map(key=>error.errors[key].message);
        req.flash('registrationErrors',registrationErrors);
           return  res.redirect('/user/register');
           
       }
       res.redirect("/");
    })
}
