
module.exports=(req,res)=>{
    
        if(req.session.userId){
            res.render('dashboard');
        }
    
        else{
            res.send("Permission denied");
        }
    
}