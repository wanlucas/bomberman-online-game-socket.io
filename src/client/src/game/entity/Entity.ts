export interface Position {
  x: number;
  y: number;
}

export default class Entity {
  constructor(
    protected context: CanvasRenderingContext2D,
    public position: Position,
  ) { }
}