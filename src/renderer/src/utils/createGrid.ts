import { COLS, ROWS } from '../constants';
import { Grid } from '../typed';

export const createGrid = (): Grid => {
  const grid = new Array(ROWS);
  for (let i = 0; i < ROWS; i++) {
    grid[i] = new Array(COLS);
    for (let j = 0; j < COLS; j++) {
      grid[i][j] = null;
    }
  }

  return grid;
};
