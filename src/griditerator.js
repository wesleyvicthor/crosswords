/**
 * performs a iterator over the grid
 * 
 * @param {object} grid The grid object
 */
var GridIterator = function (grid) {
    this.grid = grid;
    this.gridMap = [];
    this.row = 0;
    this.col = 0;

    // fill a gridmap
    for (var i = 0; i < this.grid.size; i++) {
        this.gridMap[i] = [];
        for (var j = 0; j < this.grid.size; j++) {
            this.gridMap[i][j] = this.grid.filltype;
        }
    }
    this.insertWordsInTheGrid();
}

GridIterator.prototype = {
    /**
     * Insert a word on the grid
     */
    insertWordsInTheGrid: function () {
        var self = this,
            sortRow = function () {
                self.row = self.grid.getRandByGridSize();
            },
            sortCol = function () {
                self.col = self.grid.getRandByGridSize();
            },
            wordsDispositions = this.grid.words.getWordsDisposition(),
            wordsLength = this.grid.words.all().length
            rows = wordsDispositions.rows.slice(0), // slice used to copy the array
            cols = wordsDispositions.cols.slice(0);

        while (wordsLength--) {
            var rowWord = rows.shift(),
                colWord = cols.shift();

            sortRow();
            sortCol();
            
            if (rowWord !== undefined) {
                fillCross(rowWord);
            }

            if (colWord !== undefined) {
                fillAcross(colWord);
            }
        }
        /**
         * checks if the word position exceeds the grid size.
         * 
         * @param  {string} word
         * @return {bool}
         */
        function wordPositionExceedsGridSize(word) {
            return (self.col + word.length > self.grid.size);
        }

        /**
         * [fillAcross description]
         * 
         * @param  {string} word
         * @return {null}
         */
        function fillAcross(word) {
            if (self.grid.hasWord(word)) {
                return;
            }

            if (wordPositionExceedsGridSize(word)) {
                self.prevCol();
                fillAcross(word);
            }

            var wordSplited = word.split(''),
                freeSlots = [];

            wordSplited.forEach(function (charAt, i) {
                if (self.gridMap[self.row+i]) {
                    var slot = self.gridMap[self.row+i][self.col];
                    if (charAt == slot || slot == self.grid.filltype) {
                        freeSlots.push(self.row+i);
                    }
                }
            });

            if (freeSlots.length < word.length) {
                sortCol();
                sortRow();
                freeSlots = [];
                fillAcross(word);
            }

            self.grid.wordsOnGrid.push(word);
            for (var j = 0; j < word.length; j++) {
                if (freeSlots[j] !== undefined) {
                    self.gridMap[freeSlots[j]][self.col] = word[j];
                }
            }
        }
        
        /**
         * [fillCross description]
         * 
         * @param  {string} word
         * @return null
         */
        function fillCross (word) {
            if (wordPositionExceedsGridSize(word)) {
                self.prevCol();
                fillCross(word);
            }

            var slots = self.gridMap[self.row].slice(self.col, self.col+word.length),
                supported = slots.every(function (slot) {
                    return (slot == this.grid.filltype);
                }, self);
            
            if (supported) {
                if (self.grid.hasWord(word)) {
                    return;
                }
                self.grid.wordsOnGrid.push(word);
                for (var i = 0; i < word.length; i++) {
                    self.gridMap[self.row][self.col+i] = word[i];
                }
            } else {
                sortRow();
                fillCross(word);
            }
        }
    },

    /**
     * decrement a column index
     * 
     * @return {int} column index
     */
    prevCol: function () {
        if (this.col > 0) {
            this.col--;
        }
    },

    /**
     * mount the grid
     */
    mountGrid: function () {
        var self = this;
        this.gridMap.map(function (cols) {
            var row = '';
            cols.map(function (col) {
                if (!self.grid.displayWords) {
                    col = col.replace(self.grid.filltype, self.grid.words.getRandChar());
                }
                row += ' ' + col.toUpperCase() + ' ';
            });
            self.grid.mountedGrid += row + "\n";
        });
    }
}
module.exports = GridIterator;