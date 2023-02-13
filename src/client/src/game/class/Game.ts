import Block from "./block/Block";
import Boundary from "./block/Boundary";
import Player from "./entity/Player";

export type TileMap = number[][];

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export default abstract class Game {
  protected players: Player[] = [];
  protected blocks: Block[] = [];
  protected map: TileMap = [];
  
  constructor(
    protected context: CanvasRenderingContext2D,
    protected size: Size,
  ) { }

  protected findPlayerById = (id: string) => this.players.find((player) => player.id === id);

  protected addPlayer(player: Player) {
    this.players.push(player);
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
              return this.blocks.push(new Boundary(this.context, position, size));
          }
        }
      });
    });
  }

  loadMap(map: TileMap) {
    this.map = map;
    this.blocks = [];
    this.createMap();
  }

  protected cleanScreen() {
    this.context.clearRect(0, 0, this.size.width, this.size.height);
  }
}