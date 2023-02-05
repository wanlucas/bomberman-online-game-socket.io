import io, { Socket } from 'socket.io-client';
import Player from './entity/Player';
import Game, { Size } from './Game';

interface Map {
  [key: string]: string;
}

interface Config {
  playersVelocity: number;
}

export default class OnlineGame extends Game {
  private socket: Socket;
  private lastKey: string | null = null;
  private playersVelocity: number = 0;

  constructor(context: CanvasRenderingContext2D, size: Size) {
    super(context, size);

    this.socket = io("http://localhost:3001");
    this.addEvents();
    this.addInputs();
  }

  addEvents() {
    this.socket.on('preload', (payload) => this.onPreload(payload));
    this.socket.on('connection', (player) => this.onConnection(player));
    this.socket.on('disconectionn', (id) => this.onDisconnection(id));
    this.socket.on('update', (players) => this.onUpdade(players));
  }

  onPreload({ players, config }: { players: Player[], config: Config }) {
    this.playersVelocity = config.playersVelocity;

    players.forEach(({ id, position }: Player) => {
      this.addPlayer(new Player(id, position, null, this.playersVelocity, this.context));
    });
  }

  onConnection({ position, id }: Player) {
    this.addPlayer(
      new Player(id, position, null, this.playersVelocity, this.context)
    );
  }

  onDisconnection(id: string) {
    this.removePlayer(id);
  }

  onUpdade(players: Player[]) {
    console.log(JSON.stringify(players));
    players.forEach(({ id, position, lastKey }: Player) => {
      const player = this.players.find((player) => player.id === id);

      if (player) {
        player.position = position;
        player.lastKey = lastKey;
      }
    });
  }

  sendMove() {
    this.socket.emit('move', {
      id: this.socket.id,
      move: this.lastKey
    });
  }

  addInputs() {
    const inputs = {
      w: 'top',
      d: 'right',
      s: 'down',
      a: 'left',
    } as Map;

    addEventListener('keydown', ({ key }) => {
      // TO DO - alterar direção de player local imediatamente, antes da resposta do servidor.
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

  run() {
    this.cleanScreen();
    this.players.forEach((player) => player.update());

    requestAnimationFrame(() => this.run());
  }
}