const MapUpload = angular.module('MapUpload', ['ngMaterial'])

MapUpload.controller('mainCtrl', ['$scope', '$log', '$http', function ($scope, $log, $http) {
  var makeMatrix = (length) => {
    var matrix = []
    for (let i = 0; i < length; i++) {
      var row = []
      for (let j = 0; j < length; j++) {
        row.push(0)
      }
      matrix.push(row)
    }
    return matrix
  }
  $scope.name = ''
  $scope.password = ''
  $scope.matrix = makeMatrix(10)
  $scope.placeholder = null
  $scope.toggle = (i, j) => $scope.matrix[i][j] ? $scope.matrix[i][j] = 0 : $scope.matrix[i][j] = 1
  const successCallback = (res) => $log.log(res.data)
  const errorCallback = (res) => $log.error(res)
  $scope.submit = () => {
    var data = {
      name: $scope.name,
      password: $scope.password,
      battleships: $scope.matrix
    }
    $http.post('/form-action', data).then(successCallback, errorCallback)
  }
}])
