import { Position } from "../Game";

export default class Entity {
  constructor(
    protected context: CanvasRenderingContext2D,
    public position: Position,
  ) { }
}