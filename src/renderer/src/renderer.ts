import { Game } from './components/Game';

function init(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const game = new Game(canvas);
  game.start();
}

window.addEventListener('load', init);
