module.exports = (req,res)=>{
    if(req.session.user.id){
        res.render("form")
    }
    else{
        res.redirect('/');
    }
    
};