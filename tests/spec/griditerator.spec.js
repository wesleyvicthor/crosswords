var GridIterator = require(__dirname + '/../../src/griditerator');
var Words = require(__dirname + '/../../src/words');
var Grid = require(__dirname + '/../../src/grid');

describe('Grid Iterator test', function () {

    it('should setup a iterator', function () {
        var grid = new Grid(new Words('Asa'));
        var gridIterator = new GridIterator(grid);

        expect(gridIterator.gridMap.length).toEqual(grid.size);
        expect(gridIterator.gridMap[0][0]).toBe(grid.filltype);
    });

    it('should mount the grid', function () {
        var grid = new Grid(new Words('Asa Casa Abelha Yahoo Meme'));
        var gridIterator = new GridIterator(grid);
        
        gridIterator.mountGrid();
        var mountedGrid = grid.mountedGrid.replace(/\s+/g, '');
        grid.words.all().forEach(function (word) {
            var word = word.toUpperCase();
            expect(mountedGrid.match(word).toString()).toEqual(word);
        });
    });
});