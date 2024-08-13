import { Tile } from './Tile';
import { Colors, COLS, OUTLINE_THICKNESS, RECT_HEIGHT, RECT_WIDTH, ROWS } from '../constants';
import { DrawHelperUtil } from './DrawHelperUtil';

export class DrawHandler {
  static context: CanvasRenderingContext2D;

  static helper: DrawHelperUtil;

  static setContext(ctx: CanvasRenderingContext2D): void {
    this.context = ctx;

    this.helper = new DrawHelperUtil(ctx);
  }

  static drawBackground = (): void => {
    const { width, height } = this.context.canvas;

    this.helper.drawRect(0, 0, width, height, Colors.BACKGROUND);
  };

  static drawGrid = (): void => {
    const { width, height } = this.context.canvas;

    this.helper.drawRect(0, 0, width, OUTLINE_THICKNESS, Colors.OUTLINE);
    this.helper.drawRect(0, 0, OUTLINE_THICKNESS, height, Colors.OUTLINE);
    this.helper.drawRect(width - OUTLINE_THICKNESS, 0, OUTLINE_THICKNESS, height, Colors.OUTLINE);
    this.helper.drawRect(0, height - OUTLINE_THICKNESS, width, OUTLINE_THICKNESS, Colors.OUTLINE);

    for (let row = 1; row < ROWS; row++) {
      const y = row * RECT_HEIGHT;
      this.helper.drawRect(0, y, width, OUTLINE_THICKNESS, Colors.OUTLINE);
    }

    for (let col = 1; col < COLS; col++) {
      const x = col * RECT_WIDTH;
      this.helper.drawRect(x, 0, OUTLINE_THICKNESS, height, Colors.OUTLINE);
    }
  };

  static drawTiles = (grid: Array<Array<Tile | null>>): void => {
    for (const row of grid) {
      for (const tile of row) {
        if (!tile) continue;

        tile.draw(this.helper);
      }
    }
  };
}
