import Player from "./entity/Player";

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export default class Game {
  protected players: Player[] = [];
  
  constructor(protected context: CanvasRenderingContext2D, protected size: Size) { }

  protected findPlayerById = (id: string) => this.players.find((player) => player.id === id);

  protected addPlayer(player: Player) {
    this.players.push(player);
  }

  protected removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  protected cleanScreen() {
    this.context.clearRect(0, 0, this.size.width, this.size.height);
  }
}