import { Colors, COLS, Direction, RECT_HEIGHT, RECT_WIDTH, ROWS, TileColors } from '../constants';
import { DrawHelperUtil } from './DrawHelperUtil';
import { lerp } from '../utils/lerp';

export class Tile {
  value: number;
  row: number;
  col: number;
  x: number;
  y: number;
  isMerged: boolean;

  constructor(value: number, row: number, col: number) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.x = col * RECT_WIDTH;
    this.y = row * RECT_HEIGHT;
    this.isMerged = false;
  }

  getColor = (): string => {
    const index = Math.floor(Math.log2(this.value)) - 1;
    return TileColors[index];
  };

  draw = (drawHelper: DrawHelperUtil): void => {
    const color = this.getColor();
    this.x = lerp(this.x, this.col * RECT_WIDTH, 0.25);
    this.y = lerp(this.y, this.row * RECT_HEIGHT, 0.25);
    drawHelper.drawRect(this.x, this.y, RECT_WIDTH, RECT_HEIGHT, color);
    drawHelper.drawText(
      this.x + RECT_WIDTH / 2,
      this.y + RECT_HEIGHT / 2,
      String(this.value),
      Colors.FONT,
    );
  };

  move = (dir: Direction): void => {
    if (dir === Direction.Left && this.col > 0) {
      this.col--;
      return;
    }

    if (dir === Direction.Right && this.col < COLS - 1) {
      this.col++;
      return;
    }

    if (dir === Direction.Up && this.row > 0) {
      this.row--;
      return;
    }

    if (dir === Direction.Down && this.row < ROWS - 1) {
      this.row++;
      return;
    }
  };

  moveTo = (row: number, col: number): void => {
    this.col = col;
    this.row = row;
  };
}
