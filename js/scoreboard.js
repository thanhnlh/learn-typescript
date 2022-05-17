"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scoreboard = void 0;
class Scoreboard {
    constructor() {
        this._results = [];
    }
    addResult(newResult) {
        this._results.push(newResult);
    }
    updateScoreboard() {
        let output = '<h2>Scoreboard</h2>';
        for (let i = 0; i < this._results.length; i++) {
            const result = this._results[i];
            ;
            output += '<h4>';
            output += result.playerName + ': ' + result.score + '/' + result.problemCount + ' for factor ' + result.factor;
            output += '</h4>';
        }
        const scoreElement = document.getElementById('scores');
        scoreElement.innerHTML = output;
    }
}
exports.Scoreboard = Scoreboard;
//# sourceMappingURL=scoreboard.js.map