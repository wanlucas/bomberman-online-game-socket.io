import Block from "./simulation/Block";
import maps from "../maps";
import Player from "./simulation/Player";
import Collision from "./simulation/tools/Collision";

export type TileMap = number[][];

export interface Config {
  playersVelocity: number,
  refreshRate: number,
  tickRate: number,
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number,
  height: number,
}

export default abstract class GameServer {
  public players: Player[] = [];
  public blocks: Block[] = [];
  protected map: TileMap = maps[0];
  protected refreshInt: NodeJS.Timeout | null = null;
  protected tickInt: NodeJS.Timeout | null = null;
  public size: Size = {
    width: 700,
    height: 400,
  };
  // TO DO - unificar os tamanhos de mapa do servidor e do cliente mantendo o responsivo do clinte.

  constructor(public config: Config) { }

  protected addPlayer(id: string) {
    const position = {
      x: Math.round(Math.random() * 700),
      y: Math.round(Math.random() * 400),
    };

    const player = new Player(id, position, null, this.config.playersVelocity);

    this.players.push(player);

    return player;
  }

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

  protected removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  protected createMap() {
    const tileWidth = this.size.width / this.map[0].length;
    const tileHeight = this.size.height / this.map.length;

    this.map.forEach((row, rowIndex) => {
      row.forEach((value, blockIndex) => {
        if (value) {
          const position = {
            x: blockIndex * tileWidth,
            y: rowIndex * tileHeight,
          };
          const size = {
            width: tileWidth,
            height: tileHeight,
          }
          
          switch(value) {
            default:
              return this.blocks.push(new Block(position, size));
          }
        }
      });
    });
  }

  protected runSimulation() {
    this.refreshInt = setInterval(() => {
      this.updatePlayers();
    }, 1000 / this.config.refreshRate);
  }

  protected stopSimulation() {
    if (this.refreshInt) {
      clearInterval(this.refreshInt);
    }
  }
};