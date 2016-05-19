'use strict'

exports.validate = (field, ships) => {
  var validation = {
    result: true,
    message: ''
  }
  if (ships.length !== 10) {
    validation.result = false
    validation.message = 'not 10 ships'
  } else {
    var shipType4 = 0
    var shipType3 = 0
    var shipType2 = 0
    var shipType1 = 0
    for (var ship of ships) {
      switch (ship.size) {
        case 4:
          shipType4++
          break
        case 3:
          shipType3++
          break
        case 2:
          shipType2++
          break
        case 1:
          shipType1++
          break
      }
    }
    if (!(shipType4 === 1 && shipType3 === 2 && shipType2 === 3 && shipType1 === 4)) {
      validation.result = false
      validation.message = 'not the right number of ships of each type'
    }
  }
  if (validation.result) {
    validation.result = checkAroundEachShip(field, ships)
    validation.message = validation.result ? 'success' : 'there are other cells around the ship'
  }
  console.log('valid = ' + validation.result)
  return validation
}

const checkAroundEachShip = (field, ships) => {
  var noShipsAround = true
  var xLimit, yLimit
  for (let ship of ships) {
    var x = ship.cells[0].x
    var y = ship.cells[0].y
    var length = ship.size
    var direction = ship.direction
    if (direction === 'East') {
      xLimit = x + 2
      yLimit = y + length + 1
    } else { // direction 'South' or null (single cell ship)
      xLimit = x + length + 1
      yLimit = y + 2
    }
    for (let i = x - 1; i < xLimit; i++) {
      for (let j = y - 1; j < yLimit; j++) {
        if (i >= 0 && j >= 0 && i < 10 && j < 10) {
          if (direction === 'East') {
            if ((i === x) && !(j < y || j > y + length - 1)) {
              // do nothing because these are the ship cells
            } else {
              if (field[i][j]) {
                noShipsAround = false
              }
            }
          } else { // direction 'South' or null (single cell ship)
            if ((j === y) && !(i < x || i > x + length - 1)) {
              // do nothing because these are the ship cells
            } else {
              if (field[i][j]) {
                noShipsAround = false
              }
            }
          }
        }
      }
    }
  }
  return noShipsAround
}
