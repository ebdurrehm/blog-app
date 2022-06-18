const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    id:String,
    message:String,
    image: String,
    email: String,
    time: String,
    isImageMsg: Boolean
})

module.exports = mongoose.model('chats', chatSchema);