var mongoose= require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    author: String,
    title: String,
    content: String,
    description: String,
    date: {type: Date, default: new Date()},
    slug: String,
    image: String,
    
});

const data = mongoose.model('data', userSchema);

module.exports=data;