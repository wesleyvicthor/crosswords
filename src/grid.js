/**
 * The Grid
 * 
 * @param {object} words    Words
 * @param {int} size     the grid size
 * @param {string} filltype tipo de preenchimento padrão das colunas.
 */
var Grid = function (words, size, filltype) {
    this.filltype = filltype || '*';
    this.size = size || 10;
    this.words = words;
    this.validateWordsToGrid();
    this.wordsOnGrid = [];
    this.displayWords = false;
    this.mountedGrid = '';
}

Grid.prototype = {

    validateWordsToGrid: function () {
        var self = this;

        if (this.words.all().length > this.size) {
            throw new Error('The word limit is 10');
        }

        var validWordsSize = this.words.all().every(function (word) {
            return word.length < self.size;
        });

        if (!validWordsSize) {
            throw new Error('Words length must be minor or equals to ' + this.size + ' chars');
        }
    },

    /**
     * return a random number by the grid size
     * 
     * @return {int}
     */
    getRandByGridSize: function () {
        return Math.floor(Math.random() * this.size);
    },

    /**
     * checks if words is alredy on grid
     * 
     * @param  {string}  word word
     * @return {Boolean}
     */
    hasWord: function (word) {
        return (this.wordsOnGrid.indexOf(word) !== -1);
    },

    show: function () {
        console.info(this.mountedGrid);
    }
}

module.exports = Grid;