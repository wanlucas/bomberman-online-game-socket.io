import io, { Socket } from 'socket.io-client';
import Collision from '../tools/Collision';
import Player from './entity/Player';
import Game, { Size, TileMap } from './Game';

interface Map {
  [key: string]: string;
}

interface Config {
  playersVelocity: number;
}

export default class SocketIoOnlineGame extends Game {
  private socket: Socket;
  private lastKey: string | null = null;
  private playersVelocity: number = 0;

  constructor(context: CanvasRenderingContext2D, size: Size) {
    super(context, size);

    this.socket = io();
    this.addEvents();
    this.addInputs();
  }

  private addEvents() {
    this.socket.on('preload', (payload) => this.onPreload(payload));
    this.socket.on('connection', (player) => this.onConnection(player));
    this.socket.on('disconectionn', (id) => this.onDisconnection(id));
    this.socket.on('update', (players) => this.onUpdate(players));
  }

  private onPreload({ players, map, config }: { players: Player[], map: TileMap, config: Config }) {
    this.playersVelocity = config.playersVelocity;

    players.forEach(({ id, position }: Player) => {
      this.addPlayer(new Player(id, position, null, this.playersVelocity, this.context));
    });

    this.loadMap(map)
  }

  private onConnection({ position, id }: Player) {
    this.addPlayer(
      new Player(id, position, null, this.playersVelocity, this.context)
    );
  }

  private onDisconnection(id: string) {
    this.removePlayer(id);
  }

  private onUpdate(players: Player[]) {
    players.forEach(({ id, position, lastKey }: Player) => {
      const player = this.players.find((player) => player.id === id);

      if (player) {
        player.position = position;
        player.lastKey = lastKey;
      }
    });
  }

  private sendMove() {
    const player = this.findPlayerById(this.socket.id);

    this.socket.emit('move', {
      id: this.socket.id,
      move: this.lastKey
    });
        
    if (player) {
      player.lastKey = this.lastKey;
    }
  }

  private addInputs() {
    const inputs = {
      w: 'top',
      d: 'right',
      s: 'down',
      a: 'left',
    } as Map;

    addEventListener('keydown', ({ key }) => {
      const input = inputs[key];

      if (input && input !== this.lastKey) {
        this.lastKey = input;
        this.sendMove();
      }
    });

    addEventListener('keyup', ({ key }) => {
      const input = inputs[key];

      if (input && input === this.lastKey) {
        this.lastKey = null;
        this.sendMove();
      }
    });
  };

  private updatePlayers() {
    this.players.forEach((player) => {
      player.update();

      this.blocks.forEach((block) => {
        if (Collision.playerXsquare(player, block)) {
          player.stop();
        }
      });
    });
  }

  public run() {
    this.cleanScreen();
    this.updatePlayers();
    this.blocks.forEach((block) => block.update());

    requestAnimationFrame(() => this.run());
  }
}