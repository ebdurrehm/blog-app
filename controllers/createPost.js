module.exports = (req,res)=>{
    if(req.session.userId){
        res.render("form")
    }
    else{
        res.redirect('/');
    }
    
};