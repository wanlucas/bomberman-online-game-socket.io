import { Position, Size } from "../GameServer";

export interface Velocity {
  x: number;
  y: number;
  max: number;
}

export default class Player {
  public size: Size;
  public velocity: Velocity;

  constructor(
    public readonly id: string,
    public position: Position,
    public lastKey: string | null,
    playersVelocity: number,
  ) {
    this.size = {
      width: 10,
      height: 20,
    };

    this.velocity = {
      x: 0,
      y: 0,
      max: playersVelocity,
    };
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

  update() {
    this.move();
  }
}