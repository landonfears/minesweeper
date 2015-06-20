'use strict';

angular.module('minesweeperApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gameConfig = {
      width: 10,
      height: 10,
      numberOfMines: 10,
      numberOfSquaresRevealed: 0,
      grid: null,
      win: -1
    };
    $scope.gameResult = '';
    $scope.gameBounds = {
      maxSize: 25,
      minSize: function(axis) {
        if(axis === 'width' && $scope.gameConfig.height < 2 || axis === 'height' && $scope.gameConfig.width < 2) {
          return 2;
        }
        else if(axis === 'width' && $scope.gameConfig.height >= 2 || axis ==='height' && $scope.gameConfig.width >= 2) {
          return 1;
        }
      },
      minMines: 1,
      maxMines: function() {
        return ($scope.gameConfig.width * $scope.gameConfig.height) - 1; 
      }
    };

    $scope.initializeGame = function() {
      // Build 2D grid and store info about the game
      $scope.gameConfig.grid = [];
      var rows = [], cols = [], mineCount = 0; 
      for(var i = 0; i < $scope.gameConfig.height; i++) {
        $scope.gameConfig.grid[i] = [];
        rows.push(i);
        for(var j = 0; j < $scope.gameConfig.width; j++) {
          if(i === 0) {
            cols.push(j);
          }
          $scope.gameConfig.grid[i][j] = {
            isMine: false,
            isRevealed: false,
            minesAdjacent: 0
          };
        }
      }

      // Now we will randomly distribute mines among grid
      rows = shuffle(rows);
      cols = shuffle(cols);
      while(mineCount < $scope.gameConfig.numberOfMines) {
        $scope.gameConfig.grid[rows[mineCount]][cols[mineCount]].isMine = true;
        mineCount++;
      }
    };

    $scope.endGame = function(result) {
      result = 0;
      console.log('game over');
    };

    /*function getNumAdjacentMines(row, col) {

    }*/
    function getRand(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    // Will randomize array for getting random distribution of mines
    function shuffle(nums) {
      var index, tmp;
      for(var i = 0; i < nums.length; i++) {
        // get random index to make the i index
        // index value will become i 

        index = getRand(i, nums.length - 1);
        tmp = nums[i];
        nums[i] = nums[index];
        nums[index] = tmp; 
      }

      return nums;
    }
  });
