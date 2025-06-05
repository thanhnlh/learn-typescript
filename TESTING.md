# Testing Documentation

This project now includes comprehensive unit tests for the TypeScript codebase.

## Test Setup

- **Testing Framework**: Jest
- **TypeScript Support**: ts-jest
- **Test Environment**: Node.js

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

Current test coverage:
- **Statement Coverage**: 80%
- **Function Coverage**: 80%
- **Branch Coverage**: 100%
- **Line Coverage**: 78.18%

## Test Files

### `tests/player.test.ts`
Tests for the `Player` class:
- `formatName()` method with various input scenarios
- Property getters and setters

### `tests/game.test.ts`
Tests for the `Game` class:
- Constructor initialization
- `displayGame()` HTML generation
- `calculateScore()` business logic
- Score calculation with various answer combinations

### `tests/scoreboard.test.ts`
Tests for the `Scoreboard` class:
- `addResult()` method functionality
- `updateScoreboard()` HTML generation
- Multiple result handling

### `tests/utility.test.ts`
Tests for utility functions:
- `getValue()` function with mocked DOM elements
- Various input value scenarios

## Test Structure

Tests are organized following Jest best practices:
- Each test file corresponds to a source file
- Tests are grouped using `describe()` blocks
- Individual test cases use `it()` blocks
- Setup and teardown using `beforeEach()` and `afterAll()`

## Mocking Strategy

The tests use Jest mocking for:
- DOM manipulation (document.getElementById)
- External dependencies (lodash)
- Console output (to reduce test noise)
- Module dependencies (utility functions)

## Files Not Covered

`app.ts` is not covered by unit tests as it contains:
- DOM event binding logic
- Application initialization code
- Browser-specific functionality

These would typically be covered by integration or end-to-end tests.