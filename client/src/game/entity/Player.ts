import Entity, { Position } from "./Entity";

export default class Player extends Entity {
  public readonly id: string;
  public width: number;
  public height: number;
  public velocity: number;
  public lastKey: string | null;

  constructor(
    id: string,
    position: Position,
    lastKey: string | null,
    playerVelocity: number,
    context: CanvasRenderingContext2D,
  ) {
    super(context, position);

    this.id = id;
    this.lastKey = lastKey;
    this.width = 10;
    this.height = 20;
    this.velocity = playerVelocity;
    console.log(this.lastKey);
  }

  move() {
    if (this.lastKey === 'top') {
      this.position.y -= this.velocity;
    } else if (this.lastKey === 'right') {
      this.position.x += this.velocity;
    } else if (this.lastKey === 'down') {
      this.position.y += this.velocity;
    } else if (this.lastKey === 'left') {
      this.position.x -= this.velocity;
    }
  }

  draw() {
    this.context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.move();
    this.draw();
  }
}