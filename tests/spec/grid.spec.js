var Grid = require(__dirname + '/../../src/grid');
var Words = require(__dirname + '/../../src/words');
var GridIterator = require(__dirname + '/../../src/griditerator');

describe('Grid object', function () {
    it('should setup a grid', function () {
        var words = new Words('Yahoo Meme News');
        var grid = new Grid(words);

        expect(grid.size).toEqual(10);
        expect(grid.filltype).toEqual('*');


        expect(function () {
            new Grid(new Words('paralelepipido'))
        }).toThrow();

        expect(function () {
            new Grid(new Words('asa casa massa abelha yahoo meme oba ovo vapor novo kapo'));
        }).toThrow('The word limit is 10');
    });

    it('should have added words on grid', function () {
        var grid = new Grid(new Words('Casa Abelha Dell'));
        new GridIterator(grid);

        expect(grid.hasWord('CASA')).toBe(true);
        expect(grid.hasWord('ABELHA')).toBe(true);
        expect(grid.hasWord('DELL')).toBe(true);
    });
});