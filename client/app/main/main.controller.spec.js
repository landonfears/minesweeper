'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('minesweeperApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    /*$httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);*/

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should initialize game correctly', function() {
    scope.gameConfig = {
      width: 10,
      height: 10,
      numberOfMines: 10,
      grid: null
    };

    scope.initializeGame();

    //Count number of mines manually
    var mineCount = 0;
    for(var i = 0; i < scope.gameConfig.grid.length; i++) {
      for(var j = 0; j < scope.gameConfig.grid[i].length; j++) {
        if(scope.gameConfig.grid[i][j].isMine) {
          mineCount++;
        }
      }
    }
    expect(scope.gameConfig.grid.length).toBe(10);
    expect(scope.gameConfig.grid[0].length).toBe(10);
    expect(mineCount).toBe(10);
  });
});
