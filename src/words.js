/**
 * Words manager
 * 
 * @param {string} words words(separated by space) to be inserted in the grid
 */
var Words = function (words) {
    this.wordsValidation(words);
    this.words = words.toUpperCase().split(' ');
    this.wordsDisposition = { cols: [], rows: this.words };
}

Words.prototype = {
    /**
     * returns all words defined
     * 
     * @return {array}
     */
    all: function () {
        return this.words;
    },

    /**
     * returns a random char
     * @return {string}
     */
    getRandChar: function () {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        return chars.substr(Math.floor(Math.random() * chars.length), 1);
    },

    randDisposition: function () {
        var map = { rows:[], cols:[] };
        var self = this;
        this.all().map(function (word) {
            var alignVertical = (Math.floor(Math.random() * 9) % 2);
            (alignVertical) ? map.cols.push(word) : map.rows.push(word);
        });
        this.wordsDisposition = map;
    },

    /**
     * randomize words verticaly and horizontaly
     * 
     * @return {object}
     */
    getWordsDisposition: function () {
        return this.wordsDisposition;
    },

    /**
     * validates words
     * 
     * @param  {array} words words
     */
    wordsValidation: function (words) {
        var self = this;
        if (!words) {
            throw new Error('you must type words!');
        }
    }
}

module.exports = Words;