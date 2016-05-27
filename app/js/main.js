'use strict';

var MapUpload = angular.module('MapUpload', ['ngMaterial']);

MapUpload.controller('mainCtrl', ['$scope', '$log', '$http', function ($scope, $log, $http) {
  var makeMatrix = function makeMatrix(length) {
    var matrix = [];
    for (var i = 0; i < length; i++) {
      var row = [];
      for (var j = 0; j < length; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  };
  $scope.name = '';
  $scope.password = '';
  $scope.matrix = makeMatrix(10);
  $scope.placeholder = null;
  $scope.toggle = function (i, j) {
    return $scope.matrix[i][j] ? $scope.matrix[i][j] = 0 : $scope.matrix[i][j] = 1;
  };
  var success = function success(res) {
    return $log.log(res.data);
  };
  var error = function error(res) {
    return $log.error(res);
  };
  $scope.submit = function () {
    var data = {
      name: $scope.name,
      password: $scope.password,
      battleships: $scope.matrix
    };
    $http.post('/register', data).then(success, error);
  };
}]);