module.exports=(req, res)=>{
    req.session.destroy(function(err){
        if(err) console.log(err);
        console.log('session destroyed')
        delete req.session;
        res.redirect('/');
        
    })
}