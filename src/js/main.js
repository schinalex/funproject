var MapUpload = angular.module('MapUpload', ['ngMaterial'])

MapUpload.controller('mainCtrl', ['$scope', '$log', function ($scope, $log) {
  var makeMatrix = function () {
    var matrix = []
    for (var i = 0; i < 10; i++) {
      var row = []
      for (var j = 0; i < 10; j++) {
        row.push(0)
      }
      matrix.push(row)
    }
    return matrix
  }
  var matrix = makeMatrix()
  $scope.name = ''
  $scope.password = ''
  $scope.matrix = matrix
  $log.log($scope.matrix)
}])
