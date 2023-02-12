import { Server, Socket } from "socket.io";
import GameServer, { Config } from "./GameServer";
import Player from "./simulation/Player";

export interface Preload {
  players: Player[];
  config: Config;
  map: number[][];
}

export default class SocketIOServerGame extends GameServer {
  constructor(private io: Server, public config: Config) {
    super(config);
  }

  private onMove({ id, move }: { id: string, move: string }) {
    const player = this.players.find((player) => player.id === id);

    if (player) {
      player.lastKey = move;
    };
  }

  private onDisconnection(id: string) {
    this.removePlayer(id);
    this.io.emit('disconectionn', id);
  }

  private onConnection(socket: Socket) {
    const player = this.addPlayer(socket.id);

    console.log(`Player ${player.id} connected!`);

    socket.broadcast.emit('connection', player);
    socket.emit('preload', { players: this.players, config: this.config, map: this.map } as Preload);
    socket.on('disconnect', () => this.onDisconnection(socket.id));
    socket.on('move', (move) => this.onMove(move));
  }

  private sendUpdate() {
    this.io.emit('update', this.players.map(({ id, lastKey, position }) => (
      { id, lastKey, position })
    ));
  }

  public start() {
    this.io.on('connection', (socket) => this.onConnection(socket));

    this.createMap();
    this.runSimulation();

    this.tickInt = setInterval(() => {
      this.sendUpdate();
    }, 1000 / this.config.tickRate);
  }

  public stop() {
    this.stopSimulation();

    if (this.tickInt) {
      clearInterval(this.tickInt);
    };
  }
}