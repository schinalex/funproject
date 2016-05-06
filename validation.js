'use strict'
var paddingZeros = require('./transform.js').paddingZeros
// var a = []
// for (var i = 0; i < 10; i++) {
//   var b = []
//   for (var j = 0; j < 10; j++) {
//     b.push(Math.round(Math.random()))
//   }
//   a.push(b)
// }

exports.validate = function (initialMatrix) {
  var matrix = paddingZeros(initialMatrix)
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 1) {
        findShip(matrix, i, j)
      }
    }
  }
  // console.log(matrix)
}

var findShip = function (matrix, i, j) {
  var direction = ''
  direction = checkDirection(matrix, i, j)
  console.log(direction)
  if (matrix[i][j] === 1) {
    switch (direction) {
      case 'East':
        findShip(matrix, i, j + 1)
        break
      case 'South':
        findShip(matrix, i + 1, j)
        break
      default:
        console.log('no direction')
    }
  }
  if (checkAround(matrix, i, j, direction)) {
    console.log('valid')
    matrix[i][j] = 2
  } else {
    console.log('invalid')
  }
}

var checkDirection = function (matrix, i, j) {
  if (matrix[i][j + 1] === 1) {
    return 'East'
  } else if (matrix[i - 1][j] === 1) {
    return 'South'
  }
}

var checkAround = function (matrix, i, j, direction) {
  var valid = true
  if (i < 1 || j < 0 || i > matrix.length - 2 || j > matrix.length - 2) {
    console.log('edges')
  } else {
    for (var y = -1; y < 2; y++) {
      for (var x = -1; x < 2; x++) {
        if (!(x === 0 && y === 0)) {
          if (!(direction === 'East' && x === 1 && y === 0 || direction === 'South' && x === 0 && y === 1)) {
            if (matrix[i + y][j + x]) {
              valid = false
            }
          }
        }
      }
    }
  }
  return valid
}

// validate(a)
