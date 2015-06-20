'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
	width: Number,
	height: Number,
	numberOfMines: Number,
	numberOfSquaresRevealed: Number,
	grid: [Schema.Types.Mixed],
	win: Number
});

module.exports = mongoose.model('Game', GameSchema);