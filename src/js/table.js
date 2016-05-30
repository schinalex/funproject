const MapUpload = angular.module('MapUpload', ['ngMaterial'])

MapUpload.controller('mainCtrl', ['$scope', '$log', '$http', function ($scope, $log, $http) {
  var table = []
  var tableSize = 50
  for (var i = 0; i < tableSize; i++) {
    table.push({
      place: i + 1,
      player: 'John',
      mapsPlayed: 5,
      mapsLeft: 13,
      totalMisses: 450,
      averageMisses: 30
    })
  }

  $scope.table = table
  const success = (res) => {
    $log.log(res.data)
    $scope.table = res.data
  }
  const error = (res) => $log.error(res)
  $scope.getResults = () => {
    $http.get('/getResults').then(success, error)
  }
  console.log(table.length)
}])
