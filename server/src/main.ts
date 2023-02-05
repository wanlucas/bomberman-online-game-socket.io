import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import SocketIOGameServer from './game/SocketIoGameServer';

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);

const io = new Server(server,  {
  cors: {
    origin: process.env.ORIGIN || 'http://localhost:5173',
  }
});

const gameServer = new SocketIOGameServer(io, {
  playersVelocity: 2,
  refreshRate: 60,
  tickRate: 1,
});

gameServer.start();
server.listen(port, () => console.log('conectado'));

export default server;