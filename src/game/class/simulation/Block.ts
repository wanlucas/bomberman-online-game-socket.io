import { Size, Position } from "../GameServer";

export default class Block {
  constructor(
    public position: Position,
    public size: Size,
  ) { }
}