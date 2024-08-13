import { Tile } from './Tile';
import { COLS, Direction, ROWS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { Grid } from '../typed';
import { createGrid } from '../utils/createGrid';
import { DrawHandler } from './DrawHandler';
import { getRandomPosition } from '../utils/getRandomPosition';

function generateTiles(): Array<Array<Tile>> {
  const grid = createGrid();

  for (let i = 0; i < 2; i++) {
    const { x: col, y: row } = getRandomPosition(grid);
    grid[row][col] = new Tile(2, row, col);
  }

  console.log(grid);
  return grid;
}

export class Game {
  grid: Grid;

  constructor(canvas: HTMLCanvasElement) {
    this.grid = createGrid();
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.canvas.width = SCREEN_WIDTH;
    ctx.canvas.height = SCREEN_HEIGHT;
    DrawHandler.setContext(ctx);
    window.onkeydown = this.handleInput;
  }

  start = (): void => {
    this.grid = generateTiles();
    window.requestAnimationFrame(this.gameLoop);
  };

  gameLoop = (): void => {
    DrawHandler.drawBackground();
    this.resetMerges();
    DrawHandler.drawTiles(this.grid);
    DrawHandler.drawGrid();

    // Keep requesting new frames
    window.requestAnimationFrame(this.gameLoop);
  };

  resetMerges = (): void => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const tile: Tile = this.grid[row][col];

        if (!tile) continue;

        tile.isMerged = false;
      }
    }
  };

  handleInput = (ev: KeyboardEvent): void => {
    if (ev.repeat) return;

    const directionMap = {
      ArrowLeft: Direction.Left,
      ArrowRight: Direction.Right,
      ArrowUp: Direction.Up,
      ArrowDown: Direction.Down,
    };

    if (!Object.keys(directionMap).includes(ev.key)) {
      return;
    }

    this.moveTiles(directionMap[ev.key]);
  };

  refreshGrid = (): void => {
    const tempGrid = createGrid();

    for (const row of this.grid) {
      for (const tile of row) {
        if (!tile) continue;

        tempGrid[tile.row][tile.col] = tile;
      }
    }

    this.grid = tempGrid;
  };

  boundaryCheck = (tile: Tile, direction: Direction): boolean => {
    const checkMap = {
      [Direction.Left]: tile.col > 0,
      [Direction.Right]: tile.col < COLS - 1,
      [Direction.Up]: tile.row > 0,
      [Direction.Down]: tile.row < ROWS - 1,
    };

    return checkMap[direction];
  };

  getMoveCoords = (direction: Direction): number[] => {
    const coordsMap = {
      [Direction.Left]: [-1, 0],
      [Direction.Right]: [1, 0],
      [Direction.Up]: [0, -1],
      [Direction.Down]: [0, 1],
    };

    return coordsMap[direction];
  };

  moveTiles = (direction: Direction): void => {
    let hasMoved = false;

    if ([Direction.Up, Direction.Left].includes(direction)) {
      for (let k = 0; k < 4; k++) {
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const tile: Tile = this.grid[row][col];

            if (!tile) continue;

            while (this.boundaryCheck(tile, direction)) {
              const [x, y] = this.getMoveCoords(direction);
              const hasNeighbour = this.mergeTile(tile, x, y);

              if (hasNeighbour) break;

              tile.move(direction);
              if (tile.row !== row || tile.col !== col || tile.isMerged) {
                hasMoved = true;
              }
            }
          }
        }

        this.refreshGrid();
      }
    } else if ([Direction.Down, Direction.Right].includes(direction)) {
      for (let k = 0; k < 4; k++) {
        for (let row = ROWS - 1; row >= 0; row--) {
          for (let col = COLS - 1; col >= 0; col--) {
            const tile: Tile = this.grid[row][col];

            if (!tile) continue;

            while (this.boundaryCheck(tile, direction)) {
              const [x, y] = this.getMoveCoords(direction);
              const hasNeighbour = this.mergeTile(tile, x, y);

              if (hasNeighbour) break;

              tile.move(direction);
              if (tile.row !== row || tile.col !== col || tile.isMerged) {
                hasMoved = true;
              }
            }
          }
        }

        this.refreshGrid();
      }
    }

    console.log(this.grid);

    if (hasMoved) {
      this.addTile();
    }
  };

  addTile = (): void => {
    const { x: col, y: row } = getRandomPosition(this.grid);
    this.grid[row][col] = new Tile(2, row, col);
  };

  mergeTile = (tile: Tile, xDir: number, yDir: number): boolean => {
    const row = tile.row + yDir;
    const col = tile.col + xDir;
    const neighbour = this.grid[row][col];

    if (!neighbour) {
      return false;
    }

    if (!tile.isMerged && !neighbour.isMerged && tile.value === neighbour.value) {
      console.log(tile.row, tile.col, this.grid[tile.row][tile.col]);
      tile.value *= 2;
      tile.isMerged = true;
      console.log(tile);
      tile.moveTo(row, col);

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const t = this.grid[i][j];
          if (t !== neighbour) continue;

          this.grid[i][j] = null;
        }
      }
    }

    return !!neighbour;
  };
}
