import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server,  {
  cors: {
    origin: "http://localhost:5173",
  }
});
const port = process.env.PORT || 3000;

server.listen(port, () => console.log('conectado'));

io.on('connection', (socket) => {
  console.log(socket.id + 'conectado');
});

export default server;