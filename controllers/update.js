var data = require ('../database/models/Data');

module.exports= async (req, res)=>{
    const id = {"_id": req.params.id}
    await data.findOneAndUpdate(id, {
    "author":req.body.author, 
    "title":req.body.title,
    "content": req.body.content,
    "description": req.body.description,
  }, {returnNewDocument : true})
      
      res.send('Post was updated successfully');
    
}