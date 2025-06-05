"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../app/utility");
// Mock DOM methods
const mockGetElementById = jest.fn();
Object.defineProperty(global, 'document', {
    value: {
        getElementById: mockGetElementById
    }
});
describe('Utility Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getValue', () => {
        it('should return the value of an input element', () => {
            const mockInputElement = {
                value: 'test value'
            };
            mockGetElementById.mockReturnValue(mockInputElement);
            const result = utility_1.getValue('testId');
            expect(mockGetElementById).toHaveBeenCalledWith('testId');
            expect(result).toBe('test value');
        });
        it('should return empty string when input is empty', () => {
            const mockInputElement = {
                value: ''
            };
            mockGetElementById.mockReturnValue(mockInputElement);
            const result = utility_1.getValue('emptyInput');
            expect(mockGetElementById).toHaveBeenCalledWith('emptyInput');
            expect(result).toBe('');
        });
        it('should handle numeric values as strings', () => {
            const mockInputElement = {
                value: '123'
            };
            mockGetElementById.mockReturnValue(mockInputElement);
            const result = utility_1.getValue('numericInput');
            expect(mockGetElementById).toHaveBeenCalledWith('numericInput');
            expect(result).toBe('123');
        });
        it('should handle whitespace values', () => {
            const mockInputElement = {
                value: '  spaces  '
            };
            mockGetElementById.mockReturnValue(mockInputElement);
            const result = utility_1.getValue('whitespaceInput');
            expect(mockGetElementById).toHaveBeenCalledWith('whitespaceInput');
            expect(result).toBe('  spaces  ');
        });
    });
});
//# sourceMappingURL=utility.test.js.map