var Data = require("../database/models/Data");
var slugCreator = require('./slugCreator');
var {nanoid} = require('nanoid');


 module.exports=  (req,res)=>{
     console.log(req.body);
     const slugTitle=slugCreator(req.body.title) //create slug title from post title
     const slug =`${slugTitle}-${nanoid(5)}`; //create slug from combination of the changed slug title and nanoid
     const tags = req.body.tags.split(",");
     /*if(!req.files.image){
         res.redirect("/");
     }*/
    const image =req.files.image;
    const imgPath = __dirname+'/../public/images/'+image.name;
    console.log(imgPath);
    image.mv(imgPath, (error)=>{
        Data.create({
             ...req.body,
             slug,
             tags,
             image: `/images/${image.name}`},
             (error, post)=>{
                 res.json(post);
                });
            })
        };
        