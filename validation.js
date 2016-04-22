'use strict'

var a = []
for (var i = 0; i < 10; i++) {
  var b = []
  for (var j = 0; j < 10; j++) {
    b.push(Math.floor(Math.random()))
  }
  a.push(b)
}

var validate = function (matrix) {
  var direction = ''
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 1) {
        direction = checkDirection(matrix, i, j)
        console.log(direction)
        checkAround(matrix, i, j, direction)
        matrix[i][j] = 2
      }
    }
  }
}

validate(a)

var checkDirection = function (matrix, i, j) {
  if (matrix[i][j + 1]) {
    return 'East'
  } else if (matrix[i - 1][j]) {
    return 'South'
  }
}

var checkAround = function (matrix, i, j, direction) {
  var valid = true
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
  return valid
}
