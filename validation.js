exports.validate = function (field, ships) {
  var validity = true
  if (ships.length !== 10) {
    validity = false
    console.log('not 10 ships')
  } else {
    var shipType4 = 0, shipType3 = 0, shipType2 = 0, shipType1 = 0
    for (var ship of ships) {
      console.log('ship.length = ' + ship.length)
      switch (ship.length) {
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
      validity = false
    }
    console.log('ship of each type: ' + validity)
  }
  if (validity) {
    validity = checkAroundEachShip(field, ships)
    console.log('checkAroundEachShip: ' + validity)
  }
  console.log('valid = ' + validity)
  return validity
}

var checkAroundEachShip = function (field, ships) {
  var noShipsAround = true
  var xLimit, yLimit
  for (var ship of ships) {
    var x = ship.cells[0].x
    var y = ship.cells[0].y
    var length = ship.size
    var direction = ship.direction
    console.log('x = ' + x)
    console.log('y = ' + y)
    console.log('length = ' + length)
    if (direction === 'East') {
      xLimit = x + 1
      yLimit = y + length + 1
    } else if (direction === 'South') {
      xLimit = x + length + 1
      yLimit = y + 1
    }
    for (var i = x - 1; i < xLimit; i++) {
      for (var j = y - 1; j < yLimit; j++) {
        console.log('field[' + i + '][' + j + ']')
        if (i > 0 && j > 0) {
          if (direction === 'East') {
            if ((i = x) && !(j < y || j > y + length - 1)) {
              // do nothing because these are the ship cells
            } else {
              if (field[i][j]) {
                noShipsAround = false
              } else {
                console.log('no cell around it: field[' + i + '][' + j + ']=' + field[i][j])
              }
            }
          } else if (direction === 'South') {
            if ((j = y) && !(i < x || i > x + length - 1)) {
              // do nothing because these are the ship cells
            } else {
              if (field[i][j]) {
                noShipsAround = false
              } else {
                console.log('no cell around it: field[' + i + '][' + j + ']=' + field[i][j])
              }
            }
          }
        }
      }
    }
  }
  console.log(noShipsAround)
  return noShipsAround
}
