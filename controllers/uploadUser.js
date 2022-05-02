const User = require("../database/models/User");

module.exports= (req, res) => {
    if (req.body.isAdmin) {
        req.body.isAdmin = true;
    }
    else{
        req.body.isAdmin = false;
    }
    
    User.create(req.body, (error, user) => {
        console.log(req.body)
        if (error) {
            console.log(error);


            return res.redirect('/user/register');

        }
        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;
        console.log(req.session)
        res.redirect("/");
    })
}

