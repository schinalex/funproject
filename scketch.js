'use strict'

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
  checkIfHit(randomPoint)
}

let points = initializePoints()
console.log(points.length)
console.log(getRandomPoint(points))
console.log(points.length)
