var express = require('express')
var app = express()
var validate = require('./eugen.js').validate
var paddingZeros = require('./transform.js').paddingZeros
var getShips = require('./getShips.js').getShips
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Battleship_v2'
})
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('app'))

app.post('/form-action', function (req, res) {
  console.log(req.body)
  var id = getPlayerId(req.body.password)
  if (!id) {
    res.send('no such secretKey')
  } else {
    res.send(validate(paddingZeros(req.body.battleships)))
  }
  var ships = getShips()
  insertShipsIntoDB(id, ships)
})

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})
// connection.connect()
// var getId = function (password) {
//   return new Promise(function (password) {
//     connection.query('SELECT idPlayer FROM Players WHERE SecretKey = \'' + password + '\'', function (err, rows, fields) {
//       if (err) throw err
//       resolve(rows[0].idPlayer)
//     })
//   })
// }
// getId()
//   .then(authentification)
//
// var getValue = function (arg) {
//   return new Promise(function (arg) {
//     setTimeout(function () {
//
//     })
//   })
// }
var insertShipsIntoDB = function (idPlayer, ships) {
  // inserts each ship into the DB
}

var getPlayerId = function (password) {
  connection.query('SELECT idPlayer FROM Players WHERE SecretKey = \'' + password + '\'', function (err, rows, fields) {
    if (err) throw err
    if (rows.length === 0) {
      return false
    } else {
      return rows[0].idPlayer
    }
  })
}
