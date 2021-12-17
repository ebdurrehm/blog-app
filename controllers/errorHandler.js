module.exports= (error, req, res, next)=>{
    if(error){
        res.send('500 OOPS :( Something went wrong... Please try again. ')
    }
}