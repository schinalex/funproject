'use strict'

const getLength = (matrix, x, y, direction) => {
  if (!direction) {
    return 1
  } else {
    for (var length = 0; x < 10 && matrix[x][y] === 1; length++) {
      if (direction === 'East') {
        y++
      } else if (direction === 'South') {
        x++
      }
    }
    return length
  }
}

const getDirection = (matrix, x, y) => {
  if (y < 9 && matrix[x][y + 1]) {
    return 'East'
  } else if (x < 9 && matrix[x + 1][y]) {
    return 'South'
  } else {
    return null
  }
}

exports.getShips = (field) => {
  var ships = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (field[i][j] === 1) {
        var ship = {}
        var direction = getDirection(field, i, j)
        ship.direction = direction
        var length = getLength(field, i, j, direction)
        ship.size = length
        ship.cells = []
        if (!direction) {
          ship.cells.push({x: i, y: j})
          field[i][j] = 2
        } else {
          for (let index = 0; index < length; index++) {
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
