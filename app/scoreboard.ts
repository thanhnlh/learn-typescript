import {Result} from "./result"
import * as _ from "lodash"

export class Scoreboard {
    private _results: Result[] = [];

    addResult(newResult: Result): void {
        this._results.push(newResult);
        let capNames: string = _.upperCase(newResult.playerName);
        console.log("🚀 ~ file: scoreboard.ts ~ line 10 ~ Scoreboard ~ addResult ~ capNames", capNames)        
    }

    updateScoreboard(): void {
        let output: string = '<h2>Scoreboard</h2>';
        
        for(let i = 0; i < this._results.length; i++) {
            const result: Result = this._results[i];;
            output += '<h4>';
            output += result.playerName + ': ' + result.score + '/' + result.problemCount + ' for factor ' + result.factor;
            output += '</h4>';
        }

        const scoreElement: HTMLElement = document.getElementById('scores')!;
        scoreElement.innerHTML = output;
    }
}