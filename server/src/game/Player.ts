export interface Position {
  x: number;
  y: number;
}

export default class Player {
  public width: number;
  public height: number;
  public velocity: number;

  constructor(
    public readonly id: string,
    public position: Position,
    public lastKey: string | null,
    playersVelocity: number,
  ) {
    this.width = 10;
    this.height = 20;
    this.velocity = playersVelocity;
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

  update() {
    this.move();
  }
}