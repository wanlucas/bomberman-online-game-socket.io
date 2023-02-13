import { Position } from "../Game";

export interface Velocity {
  x: number;
  y: number;
  max: number;
}

export default abstract class Entity {
  public velocity: Velocity;

  constructor(
    protected context: CanvasRenderingContext2D,
    public position: Position,
  ) {
    this.velocity = {
      x: 0,
      y: 0,
      max: 0,
    };
  }
}