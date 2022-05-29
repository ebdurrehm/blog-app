
/**
 * Every users join their '@'+id room
 * Users list will show on the admin page
 * When admin select a user , he automatically join the room which
 * is the '@'+the id of the user
 * The above logic hepls create unique room for  the  every admin<==>user pairs
 * 
 */
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
         users.push({
             id: socket.id,
             username: data.username,
             email: data.email
         })
         console.log(users);
         socket.broadcast.emit('users', users);
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
         const messages = roomMessages.filter(message => message.id === id);
         console.log(messages)
         // return these messaages to client
         callback(messages);
     })
 
 
     socket.on('chat', (data) => {
         console.log(`message id ${socket.id}`)
         roomMessages.push({
             id: socket.id,
             data,
         })
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