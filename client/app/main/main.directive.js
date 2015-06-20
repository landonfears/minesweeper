'use strict';

angular.module('minesweeperApp')
  .directive('gridCell', function () {
  	return {
  		scope: {
  			gameConfig: '=',
  			row: '=',
  			col: '=',
  			gameResult: '='
  		},
		restrict: 'C',
		link: function(scope, element) {
			var numAdj;

			function getAdjacentNumber(row, col) {
				var checkSquares = [[row-1,col-1],[row-1,col],[row-1,col+1],
									[row,col-1],[row,col+1],
									[row+1,col-1],[row+1,col],[row+1,col+1]];
				var totalRows = scope.gameConfig.height, totalCols = scope.gameConfig.width, mineCount = 0;
				for(var i = 0; i < checkSquares.length; i++){
					if(checkSquares[i][0] >= 0 && checkSquares[i][1] >= 0 &&
						checkSquares[i][0] < totalRows && checkSquares[i][1] < totalCols) {
						if(scope.gameConfig.grid[checkSquares[i][0]][checkSquares[i][1]].isMine) {
							mineCount++;
						}
					}
				}
				return mineCount;
			}

			function revealAdjacentSquares(row, col) {
				var checkSquares = [[row-1,col-1],[row-1,col],[row-1,col+1],
									[row,col-1],[row,col+1],
									[row+1,col-1],[row+1,col],[row+1,col+1]];
				var totalRows = scope.gameConfig.height, totalCols = scope.gameConfig.width;
				for(var i = 0; i < checkSquares.length; i++){
					if(checkSquares[i][0] >= 0 && checkSquares[i][1] >= 0 &&
						checkSquares[i][0] < totalRows && checkSquares[i][1] < totalCols) {
						// Trigger a click for that element
						if(!scope.gameConfig.grid[checkSquares[i][0]][checkSquares[i][1]].isRevealed) {
							$('.grid-row').eq(checkSquares[i][0]).find('.grid-cell').eq(checkSquares[i][1]).trigger('click');
						}
					}
				}
			}

			element.on('click', function() {
				if(scope.gameResult) return;
				var square = scope.gameConfig.grid[scope.row][scope.col];
				if(square.isMine) {
					// Game Over
					element.addClass('grid-cell-mine').append('<i class="fa fa-bomb"></i>');
					scope.endGame(false);
				}
				else if(!square.isRevealed) {
					// Get the adjacent number of this square
					numAdj = getAdjacentNumber(scope.row, scope.col);
					scope.$apply(function(){
						scope.gameConfig.grid[scope.row][scope.col].isRevealed = true;
						scope.gameConfig.numberOfSquaresRevealed++;
						if(scope.gameConfig.numberOfSquaresRevealed >= (scope.gameConfig.width * scope.gameConfig.height) - scope.gameConfig.numberOfMines) {
							scope.endGame(true);
						}
					});
					if(numAdj > 0) {
						element.addClass('grid-cell-revealed').text(getAdjacentNumber(scope.row, scope.col));
						
					}
					else {
						// Display all adjacent squares
						element.addClass('grid-cell-revealed');
						revealAdjacentSquares(scope.row, scope.col);
					}

				}
			});

			scope.endGame = function(result) {
				scope.$apply(function(){
					if(result) scope.gameResult = 'You Win!';
					else scope.gameResult = 'You Lose.';
				});
			};

		}
	};
});