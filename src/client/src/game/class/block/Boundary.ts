import { Position, Size } from "../Game";
import Block from "./Block";

export default class Boundary extends Block {
  constructor(
    context: CanvasRenderingContext2D,
    position: Position,
    size: Size
  ) {
    super(context, position, size);
  }
}