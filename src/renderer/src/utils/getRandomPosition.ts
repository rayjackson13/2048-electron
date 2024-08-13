/* eslint-disable no-constant-condition */

import { Tile } from '../components/Tile';
import { COLS, ROWS } from '../constants';
import { Vector } from '../typed';

const getRandomInRange = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export const getRandomPosition = (grid: Array<Array<Tile>>): Vector => {
  let row: number, col: number;

  while (true) {
    row = getRandomInRange(0, ROWS);
    col = getRandomInRange(0, COLS);

    if (!grid[row][col]) {
      break;
    }
  }

  return { x: col, y: row };
};
