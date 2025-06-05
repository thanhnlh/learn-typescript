import { Scoreboard } from '../app/scoreboard';
import { Result } from '../app/result';

// Mock lodash to avoid external dependencies in tests
jest.mock('lodash', () => ({
  upperCase: jest.fn((str: string) => str.toUpperCase())
}));

// Mock console.log to avoid noise in test output
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

// Mock DOM methods since we're testing in Node environment
const mockGetElementById = jest.fn();
Object.defineProperty(global, 'document', {
  value: {
    getElementById: mockGetElementById
  }
});

describe('Scoreboard', () => {
  let scoreboard: Scoreboard;
  let mockElement: { innerHTML: string };

  beforeEach(() => {
    scoreboard = new Scoreboard();
    mockElement = { innerHTML: '' };
    mockGetElementById.mockReturnValue(mockElement);
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('addResult', () => {
    it('should add a result to the scoreboard', () => {
      const result: Result = {
        playerName: 'John Doe',
        score: 8,
        problemCount: 10,
        factor: 5
      };

      scoreboard.addResult(result);

      // Verify the result was added (we can't directly access _results, but we can test the side effects)
      expect(consoleSpy).toHaveBeenCalledWith(
        "🚀 ~ file: scoreboard.ts ~ line 10 ~ Scoreboard ~ addResult ~ capNames",
        "JOHN DOE"
      );
    });

    it('should handle multiple results', () => {
      const result1: Result = {
        playerName: 'Alice',
        score: 7,
        problemCount: 10,
        factor: 3
      };

      const result2: Result = {
        playerName: 'Bob',
        score: 9,
        problemCount: 10,
        factor: 4
      };

      scoreboard.addResult(result1);
      scoreboard.addResult(result2);

      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenNthCalledWith(1,
        "🚀 ~ file: scoreboard.ts ~ line 10 ~ Scoreboard ~ addResult ~ capNames",
        "ALICE"
      );
      expect(consoleSpy).toHaveBeenNthCalledWith(2,
        "🚀 ~ file: scoreboard.ts ~ line 10 ~ Scoreboard ~ addResult ~ capNames",
        "BOB"
      );
    });

    it('should handle empty player name', () => {
      const result: Result = {
        playerName: '',
        score: 5,
        problemCount: 10,
        factor: 2
      };

      scoreboard.addResult(result);

      expect(consoleSpy).toHaveBeenCalledWith(
        "🚀 ~ file: scoreboard.ts ~ line 10 ~ Scoreboard ~ addResult ~ capNames",
        ""
      );
    });
  });

  describe('updateScoreboard', () => {
    it('should generate correct HTML for empty scoreboard', () => {
      scoreboard.updateScoreboard();

      expect(mockGetElementById).toHaveBeenCalledWith('scores');
      expect(mockElement.innerHTML).toBe('<h2>Scoreboard</h2>');
    });

    it('should generate correct HTML for single result', () => {
      const result: Result = {
        playerName: 'John',
        score: 8,
        problemCount: 10,
        factor: 5
      };

      scoreboard.addResult(result);
      scoreboard.updateScoreboard();

      const expectedHTML = '<h2>Scoreboard</h2><h4>John: 8/10 for factor 5</h4>';
      expect(mockElement.innerHTML).toBe(expectedHTML);
    });

    it('should generate correct HTML for multiple results', () => {
      const result1: Result = {
        playerName: 'Alice',
        score: 7,
        problemCount: 10,
        factor: 3
      };

      const result2: Result = {
        playerName: 'Bob',
        score: 9,
        problemCount: 12,
        factor: 4
      };

      scoreboard.addResult(result1);
      scoreboard.addResult(result2);
      scoreboard.updateScoreboard();

      const expectedHTML = '<h2>Scoreboard</h2>' +
        '<h4>Alice: 7/10 for factor 3</h4>' +
        '<h4>Bob: 9/12 for factor 4</h4>';
      expect(mockElement.innerHTML).toBe(expectedHTML);
    });

    it('should handle zero scores', () => {
      const result: Result = {
        playerName: 'Charlie',
        score: 0,
        problemCount: 5,
        factor: 7
      };

      scoreboard.addResult(result);
      scoreboard.updateScoreboard();

      const expectedHTML = '<h2>Scoreboard</h2><h4>Charlie: 0/5 for factor 7</h4>';
      expect(mockElement.innerHTML).toBe(expectedHTML);
    });
  });
});