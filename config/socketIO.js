
/**
 * Every users join their '@'+id room
 * Users list will show on the admin page
 * When admin select a user , he automatically join the room which
 * is the '@'+the id of the user
 * The above logic hepls create unique room for  the  every admin<==>user pairs
 * 
 */
 const CHATS = require('./../database/models/chat');
 const USERS = require('./../database/models/chatUsers');

 let users = [];
 let roomMessages = [];
 const chat = {};
 chat.init = function(io){
 io.on('connection', (socket) => {
 
     console.log(socket.id)
 
     socket.on('user_joined', async (data) => {
         const id = socket.id;
 
         //Set object accept only unique values
         // Therefore user can't join room that equals their id
         // to fix that problem, I add '@' to start of the user id
         await socket.join('@' + id);
         console.log("socket client " + socket.id + " in the room ")
         console.log(socket.rooms);
         const user = new USERS({
            id: socket.id,
            username: data.username,
            email: data.email
         })
         await user.save();
         const currentUsers = await USERS.find({});
         console.log(currentUsers);
         socket.broadcast.emit('users', currentUsers);
     })
 
     socket.on('message', async (id, callback) => {
         //delete all previous rooms of the admin
         //we need to lave from all previous rooms,
         //because when admin connect a user room,
         // another user can write new message, 
         // because of it, message can shown on the 
         // incorrect user's page
         socket.rooms.forEach(room=>{
             socket.leave(room);
         })
         //join desired user's room
         await socket.join('@' + id);
         console.log("socket admin " + socket.id + " in the room ")
         console.log(socket.rooms)
         //find user's previous chat history
         const dbMessages = await CHATS.find({"id":id})
         console.log(dbMessages)
         
         // return these messaages to client
         callback(dbMessages);
     })
 
 
     socket.on('chat', (data) => {
         console.log(`message id ${socket.id}`)
        
         const chat = new CHATS({
            id:socket.id,
            ...data
         })
         chat.save();
         socket.broadcast.to('@' + socket.id).emit('message-1', data);
     })

     socket.on('admin_message',(adminMessage)=>{
         console.log(socket.rooms)
         const currentUserRoom = socket.rooms.values()
         const id = currentUserRoom.next().value
         console.log(`curren troom ${id}`)
         socket.to(id).emit('admin_messages',adminMessage);
     })
 })
}

module.exports = chat;