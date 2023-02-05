import Player from "./Player";

export interface Config {
  playersVelocity: number,
  refreshRate: number,
  tickRate: number,
}

export default abstract class GameServer {
  public players: Player[] = [];
  protected refreshInt: NodeJS.Timeout | null = null;
  protected tickInt: NodeJS.Timeout | null = null;

  constructor(public config: Config) { }

  protected addPlayer(id: string) {
    const player = new Player(
      id,
      {
        x: Math.round(Math.random() * 700),
        y: Math.round(Math.random() * 400)
      },
      null,
      this.config.playersVelocity,
    );

    this.players.push(player);

    return player;
  }

  protected removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  protected runSimulation() {
    this.refreshInt = setInterval(() => {
      this.players.forEach((player) => {
        player.update();
      });
    }, 1000 / this.config.refreshRate);
  }

  protected stopSimulation() {
    if (this.refreshInt) {
      clearInterval(this.refreshInt);
    }
  }
};