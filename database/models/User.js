var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
const saltRounds =10;

//define user Schema
const UserSchema = new mongoose.Schema({
    usrFirstName: {type: String, required: true},
    usrLastName:  {type: String, required: true},
    usrEmail: {type: String, required: true, unique: true},
    usrPassword: {type: String, required: "enter"},
    isAdmin:{type:String, required:true}
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