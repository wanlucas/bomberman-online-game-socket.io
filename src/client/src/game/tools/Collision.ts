import Player from "../class/entity/Player";
import { Position, Size } from "../class/Game";

export interface SquareCollider {
  position: Position,
  size: Size,
}

export default class Collision {
  static playerXsquare(player: Player, square: SquareCollider) {
    return (
      player.position.x + player.velocity.x < square.position.x + square.size.width &&
      player.position.x + player.velocity.x + player.size.width > square.position.x &&
      player.position.y + player.velocity.y < square.position.y + square.size.height &&
      player.position.y + player.velocity.y + player.size.height > square.position.y
    );
  }
}