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
const initializePoints = () => {
  let points = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      points.push({ x: j, y: i })
    }
  }
  return points
}
const getRandomNumber = (n) => Math.floor(Math.random() * n)
const getRandomPoint = (points) => points.splice(getRandomNumber(points.length), 1)[0]
const shoot = (points) => {
  let randomPoint = getRandomPoint(points)
  console.log(randomPoint)
  return checkIfHit(randomPoint)
}
const play = () => {
  let points = initializePoints()
  for (let i = 0, c = 0; i < 100 && c < 20; i++) {
    console.log('iterration : ' + i)
    let hit = shoot(points)
    if (hit) {
      c++
      console.log('c = ' + c)
    }
    console.log(hit)
  }
}

play()
