export class DrawHelperUtil {
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  drawRect = (x: number, y: number, w: number, h: number, color?: string): void => {
    if (color) this.context.fillStyle = color;

    this.context.fillRect(x, y, w, h);
  };

  drawText = (x: number, y: number, text: string, color: string): void => {
    this.context.font = '60px bold Comic Sans MS, Comic Sans, cursive';
    this.context.fillStyle = color;
    const { width } = this.context.measureText(text);
    this.context.fillText(text, x - width / 2 + 5, y + 24);
  };
}
