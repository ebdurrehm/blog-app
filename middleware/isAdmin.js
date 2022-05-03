module.exports=function(req,res,next){
    if(req.user.isAdmin ==='true'){
       
        next();
        
    } else{
        res.status(401);
        res.send('you have not permission');
       
    }
    
    
}