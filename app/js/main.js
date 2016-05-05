'use strict';

var MapUpload = angular.module('MapUpload', ['ngMaterial']);

MapUpload.controller('mainCtrl', ['$scope', '$log', '$http', function ($scope, $log, $http) {
  $scope.makeMatrix = function () {
    var matrix = [];
    for (var i = 0; i < 10; i++) {
      var row = [];
      for (var j = 0; i < 10; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  };
  // console.log($scope.makeMatrix())
  $scope.printMatrix = function (matrix) {
    for (var i = 0; i < matrix.length; i++) {
      var row = '';
      for (var j = 0; i < matrix.length; j++) {
        row += matrix[i][j];
      }
      $log.log(row);
    }
  };
  $scope.name = '';
  $scope.password = '';
  $scope.matrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  $scope.placeholder = null;
  $scope.toggle = function (i, j) {
    if ($scope.matrix[i][j]) {
      $scope.matrix[i][j] = 0;
    } else {
      $scope.matrix[i][j] = 1;
    }
  };
  $scope.successCallback = function (res) {
    $log.log('Success!!!');
    $log.log(res);
  };
  $scope.errorCallback = function (res) {
    $log.log('Error!!!');
    $log.error(res);
  };
  $scope.submit = function () {
    var data = {
      name: $scope.name,
      password: $scope.password,
      battleships: $scope.matrix
    };
    $http.post('/form-action', data).then($scope.successCallback, $scope.errorCallback);
  };
}]);