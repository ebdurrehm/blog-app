var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
const saltRounds =10;

//define user Schema
const UserSchema = new mongoose.Schema({
    usrFirstName: {type: String, required: true},
    usrLastName:  {type: String, required: true},
    usrEmail: {type: String, required: true, unique: true},
    usrPassword: {type: String, required: "enter"},
    isAdmin:{type:String, required:true},
    userImage:{type:String, required:false},
    social_id:{type:String, required:false},
    profile_url:{type:String, required:false},
    provider:{type:String,required:false},
    last_login:{type:Date, required:false},
    login_count:{type:Number}
});

//do some processses before document (schema) saved and go on next process.
UserSchema.pre("save", function (next){
    const userData = this // "this" is referred document here (schema)

     bcrypt.hash(userData.usrPassword, saltRounds, function(error, hash){
         userData.usrPassword = hash //now password is hashed password (encrypted)
         next() //go next process
     })
});




//create model and export it
module.exports = mongoose.model("user", UserSchema);