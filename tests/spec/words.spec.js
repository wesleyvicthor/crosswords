var Words = require('../../src/words');

describe('Words object', function () {

    it('should setup words', function () {
        var words = new Words('Casa Fada Asa');
        expect(words.all().length).toEqual(3);
    });

    it('should validate words', function () {
        expect(function () { new Words(); }).toThrow('you must type words!');
    });

    it('should return a random char', function () {
        var words = new Words('asa');
        expect(typeof(words.getRandChar())).toBe('string');
        expect(words.getRandChar().length).toEqual(1);
    });
});