
module.exports = (req, res, next)=>{
    
    if (!req.session.userId){
        res.send('you are not logged');
    }else{
        next();
    }
    
}