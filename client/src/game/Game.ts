import Player from "./entity/Player";

export interface Size {
  width: number;
  height: number;
}

export default class Game {
  protected players: Player[] = [];
  
  constructor(protected context: CanvasRenderingContext2D, protected size: Size) { }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  cleanScreen() {
    this.context.clearRect(0, 0, this.size.width, this.size.height);
  }
}