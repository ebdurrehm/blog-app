module.exports=(req, res)=>{
    req.session.destroy(function(){
        
        res.redirect('/');
        
    })
}