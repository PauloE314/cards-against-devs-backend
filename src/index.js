const http = require('http');
const { Server } = require('socket.io');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const server = http.createServer();

const io = new Server(server);

io.on('connection', () => {
  console.log('Socket connected');
});

server.listen(process.env.PORT, () => console.log('Server is running'));
