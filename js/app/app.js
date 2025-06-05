"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="player.ts" />
/// <reference path="game.ts" />
const player_1 = require("./player");
const game_1 = require("./game");
const UtilHelper = __importStar(require("./utility"));
let newGame;
// add click handler to the start game button
document.getElementById('startGame').addEventListener('click', () => {
    const player = new player_1.Player();
    player.name = UtilHelper.getValue('playername');
    const problemCount = Number(UtilHelper.getValue('problemCount'));
    const factor = Number(UtilHelper.getValue('factor'));
    newGame = new game_1.Game(player, problemCount, factor);
    newGame.displayGame();
});
// add click handler to the calculate score button
document.getElementById('calculate').addEventListener('click', () => {
    newGame.calculateScore();
});
//# sourceMappingURL=app.js.map