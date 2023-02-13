import { Position, Size } from "../Game";
import Entity from "./Entity";

export default class Player extends Entity {
  public readonly id: string;
  public size: Size;
  public lastKey: string | null;

  constructor(
    id: string,
    position: Position,
    lastKey: string | null,
    playersVelocity: number,
    context: CanvasRenderingContext2D,
  ) {
    super(context, position);

    this.id = id;
    this.lastKey = lastKey;
    this.velocity.max = playersVelocity,
    this.size = {
      width: 10,
      height: 20,
    }
  }

  public stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  private move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    this.stop();

    if (this.lastKey === 'top') {
      this.velocity.y = -this.velocity.max;
    } else if (this.lastKey === 'right') {
      this.velocity.x = this.velocity.max;
    } else if (this.lastKey === 'down') {
      this.velocity.y = this.velocity.max;
    } else if (this.lastKey === 'left') {
      this.velocity.x = -this.velocity.max;
    }
  }

  private draw() {
    this.context.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
  }

  public update() {
    this.move();
    this.draw();
  }
}