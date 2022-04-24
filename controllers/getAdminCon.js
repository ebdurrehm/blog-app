
module.exports=(req,res)=>{
    
        if(req.session.isAdmin){
            res.render('dashboard');
        }
    
        else{
            res.send("Permission denied");
        }
    
}