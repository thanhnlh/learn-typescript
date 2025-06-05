"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../app/player");
describe('Player', () => {
    let player;
    beforeEach(() => {
        player = new player_1.Player();
    });
    describe('formatName', () => {
        it('should convert name to uppercase', () => {
            player.name = 'john doe';
            expect(player.formatName()).toBe('JOHN DOE');
        });
        it('should handle empty string', () => {
            player.name = '';
            expect(player.formatName()).toBe('');
        });
        it('should handle single character name', () => {
            player.name = 'a';
            expect(player.formatName()).toBe('A');
        });
        it('should handle name with special characters', () => {
            player.name = 'john-doe_123';
            expect(player.formatName()).toBe('JOHN-DOE_123');
        });
        it('should handle name that is already uppercase', () => {
            player.name = 'JANE SMITH';
            expect(player.formatName()).toBe('JANE SMITH');
        });
        it('should handle mixed case name', () => {
            player.name = 'JoHn DoE';
            expect(player.formatName()).toBe('JOHN DOE');
        });
    });
    describe('Player properties', () => {
        it('should allow setting and getting name', () => {
            player.name = 'Test Player';
            expect(player.name).toBe('Test Player');
        });
        it('should allow setting and getting age', () => {
            player.age = 25;
            expect(player.age).toBe(25);
        });
        it('should allow setting and getting highScore', () => {
            player.highScore = 100;
            expect(player.highScore).toBe(100);
        });
    });
});
//# sourceMappingURL=player.test.js.map