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
exports.Scoreboard = void 0;
const _ = __importStar(require("lodash"));
class Scoreboard {
    constructor() {
        this._results = [];
    }
    addResult(newResult) {
        this._results.push(newResult);
        let capNames = _.upperCase(newResult.playerName);
        console.log("🚀 ~ file: scoreboard.ts ~ line 10 ~ Scoreboard ~ addResult ~ capNames", capNames);
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