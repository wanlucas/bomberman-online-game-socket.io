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
const port = process.env.PORT || 3001;

server.listen(port, () => console.log('conectado'));

interface Player {
  id: string,
  lastKey: string | null,
  position: {
    x: number,
    y: number,
  }
}

const players: Player[] = [];
const config = {
  playersVelocity: 2,
};

io.on('connection', (socket) => {
  const player = { id: socket.id, position: { x: Math.random() * 400, y: Math.random() * 400 } };

  socket.emit('preload', { players, config });
  io.emit('connection', player);
  
  socket.on('disconnect', () => {
    io.emit('disconection', socket.id);
    players.filter((player) => player.id !== socket.id);
  });

  socket.on('move', ({ id, move }) => {
    const player = players.find((player) => player.id === id);
    if (player) player.lastKey = move;
  });
  
  players.push({ ...player, lastKey: null });
});

setInterval(() => {
  io.emit('update players', players);
}, 1000 / 5);

setInterval(() => {
  players.forEach((player) => {
    if (player.lastKey === 'top') {
      player.position.y -= config.playersVelocity;
    } else if (player.lastKey === 'right') {
      player.position.x += config.playersVelocity;
    } else if (player.lastKey === 'down') {
      player.position.y += config.playersVelocity;
    } else if (player.lastKey === 'left') {
      player.position.x -= config.playersVelocity;
    }
  });
}, 1000 / 60);

export default server;