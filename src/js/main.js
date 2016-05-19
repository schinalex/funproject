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
  const success = (res) => $log.log(res.data)
  const error = (res) => $log.error(res)
  $scope.submit = () => {
    var data = {
      name: $scope.name,
      password: $scope.password,
      battleships: $scope.matrix
    }
    $http.post('/register', data).then(success, error)
  }
  $scope.secretKey = ''
  $scope.gameId = ''
  $scope.x = ''
  $scope.y = ''
  $scope.shoot = () => {
    var data = {
      secretKey: $scope.secretKey,
      gameId: $scope.gameId,
      x: $scope.x,
      y: $scope.y
    }
    $http.post('/shoot', data).then(success, error)
  }
}])
// MapUpload.controller('testCtrl', ['$scope', '$log', '$http', function ($scope, $log, $http) {
//   const success = (res) => $log.log(res.data)
//   const error = (res) => $log.error(res)
//   $scope.submit = () => {
//     var data = {
//       name: $scope.name,
//       password: $scope.password,
//       battleships: $scope.matrix
//     }
//     $http.post('/register', data).then(success, error)
//   }
//   $scope.secretKey = ''
//   $scope.gameId = ''
//   $scope.x = ''
//   $scope.y = ''
//   $scope.shoot = () => {
//     var data = {
//       secretKey: $scope.secretKey,
//       gameId: $scope.gameId,
//       x: $scope.x,
//       y: $scope.y
//     }
//     $http.post('/shoot', data).then(success, error)
//   }
// }])
