const app = require('./app');
const { createServer } = require('http');
const httpServer = createServer(app);
const { Server } = require('socket.io');
const chat = require('./config/socketIO');
const io = new Server(httpServer);
//initilaize chat app server
chat.init(io);

//server configuration
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
httpServer.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});



