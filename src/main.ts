import express from 'express';
import { Server } from 'socket.io';
import path from 'path'
import http from 'http';
import SocketIOGameServer from './game/class/SocketIoGameServer';

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const baseDir = path.join(__dirname, 'client', 'dist');

app.use(express.static(`${baseDir}`));

app.get('/', (_req, res) => {
  return res.sendfile('index.html' , { root : baseDir });
});

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const gameServer = new SocketIOGameServer(io, {
  playersVelocity: 2,
  refreshRate: 60,
  tickRate: 20,
});
gameServer.start();

server.listen(port, () => console.log('conectado'));

export default server;