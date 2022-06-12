/// <reference path="player.ts" />
/// <reference path="game.ts" />
import { Player } from "./player"
import { Game } from "./game"
import * as UtilHelper from "./utility"

let newGame: Game;

// add click handler to the start game button
document.getElementById('startGame')!.addEventListener('click', () => {
  const player: Player = new Player();
  player.name = UtilHelper.getValue('playername');

  const problemCount: number = Number(UtilHelper.getValue('problemCount'));
  const factor: number = Number(UtilHelper.getValue('factor'));

  newGame = new Game(player, problemCount, factor);
  newGame.displayGame();
});

// add click handler to the calculate score button
document.getElementById('calculate')!.addEventListener('click', () => {
  newGame.calculateScore();
});