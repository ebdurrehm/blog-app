const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
    username:String,
    email:String
})

module.exports = mongoose.model('chat_users',UserSchema)