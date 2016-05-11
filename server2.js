var express = require('express')
var app = express()
var validate = require('./validation.js').validate
// var paddingZeros = require('./transform.js').paddingZeros
var getShips = require('./getShips.js').getShips

// var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'Battleship_v2'
// })
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
    var ships = getShips(req.body.battleships)
    var validity = validate(req.body.battleships, ships)
    res.send(validity)
    if (validity) {
      insertShipsIntoDB(id, ships)
    }
  }
})

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})
// connection.connect()

// var result
// var password = '1234'
// var name = 'Jora'
// var queryDB = function (query) {
//   connection.query(query, function (err, rows, fields) {
//     if (err) { console.log(err) }
//     else {
//       result = rows;
//       console.log(rows)
//     }
//     return rows
//   });
// }
var insertShipsIntoDB = function () {
  // inserts each ship into the DB
}
var getPlayerId = function (password) {
  var check = function (err, rows, fields) {
    if (err) throw err
    console.log(rows[0].SecretKey)
    console.log(password)
    if (!(rows[0].SecretKey === password)) {
      console.log('nope')
      return false
    } else {
      return rows[0].SecretKey
    }
  }
  return check(null, [{SecretKey: '1234'}], null)
}

// var updatePlayer = function (name, secretKey) {
//   var id = queryDB('SELECT IdPlayer FROM Players WHERE SecretKey = \'' + secretKey + '\'')
//   queryDB('UPDATE Players SET Name = \'' + name + '\' WHERE idPlayer = ' + id)
// }

// queryDB('SELECT idPlayer FROM Players WHERE idPlayer = 2')
// var x = queryDB('SELECT SecretKey FROM Players WHERE SecretKey = \'' + '1234' + '\'')
// console.log(x[0])
// queryDB('SELECT IFNULL ((SELECT SecretKey FROM Players WHERE SecretKey = \'' + '1234' + '\'), \'not found\')')

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err
//   console.log('The solution is: ', rows[0].solution)
// })
//
// var addPlayer = function (name, secretKey) {
//   connection.query('INSERT INTO Players (name, secretKey) values (\'' + name + '\', \'' + secretKey + '\')', function (err, rows, fields) {
//     if (err) throw err
//     console.log(rows)
//   })
// }
// var listPlayers = function () {
//   connection.query('SELECT * from Players', function (err, rows, fields) {
//     if (err) throw err
//     console.log(rows)
//   })
// }
//
// var initiateKeys = function (nrKeys) {
//   for (var i = 0; i < nrKeys; i++) {
//     addPlayer('', randomPassword(10))
//   }
// }
//
// function randomPassword (length) {
//   var chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890'
//   var pass = ''
//   for (var x = 0; x < length; x++) {
//     var i = Math.floor(Math.random() * chars.length)
//     pass += chars.charAt(i)
//   }
//   return pass
// }
//
// initiateKeys(100)
// addPlayer('Eugen', 'askhdhalksjd')
// listPlayers()
