"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
const game_1 = require("./game");
const UtilHelper = require("./utility");
let newGame;
document.getElementById('startGame').addEventListener('click', () => {
    const player = new player_1.Player();
    player.name = UtilHelper.getValue('playername');
    const problemCount = Number(UtilHelper.getValue('problemCount'));
    const factor = Number(UtilHelper.getValue('factor'));
    newGame = new game_1.Game(player, problemCount, factor);
    newGame.displayGame();
});
document.getElementById('calculate').addEventListener('click', () => {
    newGame.calculateScore();
});
//# sourceMappingURL=app.js.map