import { Game } from '../app/game';
import { Player } from '../app/player';
import { Scoreboard } from '../app/scoreboard';

// Mock the utility module
jest.mock('../app/utility', () => ({
  getValue: jest.fn()
}));

// Mock the Scoreboard class
jest.mock('../app/scoreboard');

// Mock DOM methods
const mockGetElementById = jest.fn();
const mockRemoveAttribute = jest.fn();
const mockSetAttribute = jest.fn();

Object.defineProperty(global, 'document', {
  value: {
    getElementById: mockGetElementById
  }
});

describe('Game', () => {
  let game: Game;
  let player: Player;
  let mockElement: any;
  let mockScoreboard: jest.Mocked<Scoreboard>;

  beforeEach(() => {
    player = new Player();
    player.name = 'Test Player';
    
    game = new Game(player, 5, 3);
    
    mockElement = {
      innerHTML: '',
      removeAttribute: mockRemoveAttribute,
      setAttribute: mockSetAttribute
    };
    
    mockGetElementById.mockReturnValue(mockElement);
    
    // Clear all mocks
    jest.clearAllMocks();
    
    // Get the mocked scoreboard instance
    mockScoreboard = jest.mocked(new Scoreboard());
    (game as any)._scoreboard = mockScoreboard;
  });

  describe('constructor', () => {
    it('should initialize with correct player, problemCount, and factor', () => {
      expect(game.player).toBe(player);
      expect(game.problemCount).toBe(5);
      expect(game.factor).toBe(3);
    });

    it('should create a scoreboard instance', () => {
      expect(Scoreboard).toHaveBeenCalled();
    });
  });

  describe('displayGame', () => {
    it('should generate correct HTML for the game form', () => {
      game.displayGame();

      expect(mockGetElementById).toHaveBeenCalledWith('game');
      
      // Check that the HTML contains the expected structure
      const expectedHTML = mockElement.innerHTML;
      expect(expectedHTML).toContain('3 x 1 =');
      expect(expectedHTML).toContain('3 x 2 =');
      expect(expectedHTML).toContain('3 x 3 =');
      expect(expectedHTML).toContain('3 x 4 =');
      expect(expectedHTML).toContain('3 x 5 =');
      expect(expectedHTML).toContain('id="answer1"');
      expect(expectedHTML).toContain('id="answer2"');
      expect(expectedHTML).toContain('id="answer3"');
      expect(expectedHTML).toContain('id="answer4"');
      expect(expectedHTML).toContain('id="answer5"');
    });

    it('should enable the calculate button', () => {
      game.displayGame();

      expect(mockGetElementById).toHaveBeenCalledWith('calculate');
      expect(mockRemoveAttribute).toHaveBeenCalledWith('disabled');
    });

    it('should handle different problem counts', () => {
      const gameWith2Problems = new Game(player, 2, 7);
      gameWith2Problems.displayGame();

      const expectedHTML = mockElement.innerHTML;
      expect(expectedHTML).toContain('7 x 1 =');
      expect(expectedHTML).toContain('7 x 2 =');
      expect(expectedHTML).not.toContain('7 x 3 =');
    });

    it('should handle different factors', () => {
      const gameWithFactor9 = new Game(player, 3, 9);
      gameWithFactor9.displayGame();

      const expectedHTML = mockElement.innerHTML;
      expect(expectedHTML).toContain('9 x 1 =');
      expect(expectedHTML).toContain('9 x 2 =');
      expect(expectedHTML).toContain('9 x 3 =');
    });
  });

  describe('calculateScore', () => {
    beforeEach(() => {
      // Mock the getValue function to return specific answers
      const { getValue } = require('../app/utility');
      getValue.mockImplementation((id: string) => {
        switch (id) {
          case 'answer1': return '3';   // 3 x 1 = 3 (correct)
          case 'answer2': return '6';   // 3 x 2 = 6 (correct)
          case 'answer3': return '10';  // 3 x 3 = 9 (incorrect, answered 10)
          case 'answer4': return '12';  // 3 x 4 = 12 (correct)
          case 'answer5': return '14';  // 3 x 5 = 15 (incorrect, answered 14)
          default: return '0';
        }
      });
    });

    it('should calculate correct score', () => {
      game.calculateScore();

      // Should have called addResult with correct score (3 out of 5)
      expect(mockScoreboard.addResult).toHaveBeenCalledWith({
        playerName: 'Test Player',
        score: 3,
        problemCount: 5,
        factor: 3
      });
    });

    it('should update the scoreboard', () => {
      game.calculateScore();

      expect(mockScoreboard.updateScoreboard).toHaveBeenCalled();
    });

    it('should disable the calculate button', () => {
      game.calculateScore();

      expect(mockGetElementById).toHaveBeenCalledWith('calculate');
      expect(mockSetAttribute).toHaveBeenCalledWith('disabled', 'true');
    });

    it('should handle all correct answers', () => {
      const { getValue } = require('../app/utility');
      getValue.mockImplementation((id: string) => {
        switch (id) {
          case 'answer1': return '3';   // 3 x 1 = 3
          case 'answer2': return '6';   // 3 x 2 = 6
          case 'answer3': return '9';   // 3 x 3 = 9
          case 'answer4': return '12';  // 3 x 4 = 12
          case 'answer5': return '15';  // 3 x 5 = 15
          default: return '0';
        }
      });

      game.calculateScore();

      expect(mockScoreboard.addResult).toHaveBeenCalledWith({
        playerName: 'Test Player',
        score: 5,
        problemCount: 5,
        factor: 3
      });
    });

    it('should handle all incorrect answers', () => {
      const { getValue } = require('../app/utility');
      getValue.mockImplementation(() => '999'); // All wrong answers

      game.calculateScore();

      expect(mockScoreboard.addResult).toHaveBeenCalledWith({
        playerName: 'Test Player',
        score: 0,
        problemCount: 5,
        factor: 3
      });
    });

    it('should handle non-numeric answers', () => {
      const { getValue } = require('../app/utility');
      getValue.mockImplementation(() => 'abc'); // Non-numeric answers

      game.calculateScore();

      expect(mockScoreboard.addResult).toHaveBeenCalledWith({
        playerName: 'Test Player',
        score: 0,
        problemCount: 5,
        factor: 3
      });
    });
  });
});