export const Colors = {
  BACKGROUND: 'rgb(205, 192, 180)',
  FONT: 'rgb(119, 110, 101)',
  OUTLINE: 'rgb(187, 173, 160)',
};

export const OUTLINE_THICKNESS = 10;

export const FPS = 60;

export const SCREEN_WIDTH = 800;
export const SCREEN_HEIGHT = 800;

export const ROWS = 4;
export const COLS = 4;

export const RECT_WIDTH = Math.floor(SCREEN_WIDTH / ROWS);
export const RECT_HEIGHT = Math.floor(SCREEN_HEIGHT / COLS);

export const MOVE_VELOCITY = 1;

export const TileColors = [
  'rgb(237, 229, 218)',
  'rgb(238, 225, 201)',
  'rgb(243, 178, 122)',
  'rgb(246, 150, 101)',
  'rgb(247, 124, 95)',
  'rgb(247, 95, 59)',
  'rgb(237, 208, 115)',
  'rgb(237, 204, 99)',
  'rgb(236, 202, 80)',
];

export const enum Direction {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down',
}
