var Data = require("../database/models/Data");
var slugCreator = require('./slugCreator');
var {nanoid} = require('nanoid');

 module.exports=  (req,res)=>{
     const slugTitle=slugCreator(req.body.title) //create slug title from post title
     const slug =`${slugTitle}-${nanoid(5)}`; //create slug from combination of the changed slug title and nanoid
     if(!req.files.image){
         res.redirect("/");
     }
    const image =req.files.image;
    const imgPath = __dirname+'/../public/'+image.name;
    console.log(imgPath);
    image.mv(imgPath, (error)=>{
        Data.create({
             ...req.body,
             slug,
             image: `/${image.name}`},
             (error, post)=>{
                 res.redirect('/blog/'+post.slug);
                });
            })
        };
        