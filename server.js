const app = require('./app');
require('dotenv').config({path:'secret.env'});
const { createServer } = require('http');
const httpServer = createServer(app);
const { Server } = require('socket.io');
const chat = require('./config/socketIO');
const io = new Server(httpServer);
//initilaize chat app server
chat.init(io);

//server configuration
console.log(process.env.YOUR_HOST)
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
httpServer.listen(server_port, function () {
    console.log('Listening on port %d', server_port);
});



