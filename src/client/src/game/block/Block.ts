import { Position, Size } from "../Game";

export default abstract class Block {
  constructor(
    private context: CanvasRenderingContext2D,
    public position: Position,
    public size: Size,
  ) { }

  draw() {
    this.context.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
  }

  update() {
    this.draw();
  }
}