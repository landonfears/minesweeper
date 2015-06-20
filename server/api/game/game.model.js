'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  width: Number,
  height: Number,
  mines: Number,
  squaresRevealed: Number,
  grid: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Game', GameSchema);