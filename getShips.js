var getLength = function (matrix, x, y, direction) {
  if (!direction) {
    return 1
  } else {
    for (var length = 0; matrix[x][y] === 1; length++) {
      if (direction === 'East') {
        y++
      } else if (direction === 'South') {
        x++
      }
    }
    console.log('length=' + length)
    return length
  }
}

var getDirection = function (matrix, x, y) {
  if (matrix[x][y + 1]) {
    return 'East'
  } else if (matrix[x + 1][y]) {
    return 'South'
  } else {
    return null
  }
}
exports.getShips = function (field) {
  var ships = []
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (field[i][j] === 1) {
        var ship = {}
        var direction = getDirection(field, i, j)
        ship.direction = direction
        console.log(direction)
        console.log(i, j)
        var length = getLength(field, i, j, direction)
        ship.size = length
        ship.cells = []
        console.log(i, j)
        if (!direction) {
          ship.cells.push({x: i, y: j})
          field[i][j] = 2
        } else {
          for (var index = 0; index < length; index++) {
            if (direction === 'East') {
              ship.cells.push({x: i, y: j + index})
              field[i][j + index] = 2
            } else if (direction === 'South') {
              ship.cells.push({x: i + index, y: j})
              field[i + index][j] = 2
            }
          }
        }
        ships.push(ship)
      }
    }
  }
  console.log(ships)
  console.log(field)
  return ships
}
