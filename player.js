'use strict'

const field = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 1, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 0, 1, 1, 0]
]

// let count = 0
// let shipCells = 0
// for (let row of field) {
//   for (let cell of row) {
//     count++
//     if (cell) {
//       console.log(cell)
//       shipCells++
//     }
//   }
// }
// console.log(count)
// console.log(shipCells)

const checkIfHit = (obj) => {
  let hit = false
  field.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (x === obj.x && y === obj.y) {
        if (cell) {
          hit = true
          console.log('x = ' + x + '; y = ' + y + '; is hit = ' + cell)
        }
      }
    })
  })
  return hit
}

const randomNumber = () => Math.floor(Math.random() * 10)

const testRandom = () => {
  if (randomNumber() < 10) {
    
  }
}

const getCoordinates = () => {
  let x = randomNumber()
  let y = randomNumber()
  return {x: x, y: y}
}

const checkIfAlreadyShot = (obj, shots) => {
  let shot = false
  for (let point of shots) {
    if (point.x === obj.x && point.y === obj.x) {
      shot = true
    }
  }
  return shot
}

// const shoot = (obj, shots) => {
//   if (checkIfAlreadyShot(obj, shots)) {
//     return shoot(getCoordinates(), shots)
//   } else {
//     shots.push(obj)
//     return checkIfHit(obj)
//   }
// }

const shoot = (shots) => {
  var coordinates = {}
  for (var alreadyShot = true; alreadyShot === true; alreadyShot = checkIfAlreadyShot(coordinates, shots)) {
    coordinates = getCoordinates()
  }
  shots.push(coordinates)
  return checkIfHit(coordinates)
}

const play = (n) => {
  let shots = []
  let c = 0
  for (let i = 0; i < n; i++) {
    let hit = shoot(shots)
    if (hit) {
      c++
    }
    console.log(shots[shots.length - 1])
    console.log(hit)
  }
  console.log(c)
  // console.log(shots)
  console.log(shots.length)
}

play(100)
console.log(getCoordinates())
console.log(shoot([]))
