var express = require('express')
var async = require('async')
var app = express()
var validate = require('./eugen.js').validate
var paddingZeros = require('./transform.js').paddingZeros
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
  if (!authentication(req.body.password)) {
    res.send('no such secretKey')
  } else {
    res.send(validate(paddingZeros(req.body.battleships)))
  }
})

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})
connection.connect()

// var result
var password = '1234'
var name = 'Jora'
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

function getLength (matrix, x, y) {
  var length = 0
  if (matrix[x][y + 1] === 1) {
    while (matrix[x][y++]) {
      length++
    }
  } else if (matrix[x + 1][y]) {
    while (matrix[x++][y]) {
      length++
    }
  }
  return length
}
var getDirection = function (matrix, x, y) {
  if (matrix[x][y + 1]) {
    return 'East'
  } else if (matrix[x + 1][y]) {
    return 'South'
  }
}
var getShips = function (field) {
  var ships = []
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (field[i][j] === 1) {
        var ship = {}
        ship.cells = []
        var direction = getDirection(field, i, j)
        var length = getLength(field, i, j)
        for (var index = 0; index < length; index++) {
          if (direction === 'East') {
            ship.cells.push([i, j + index])
            field[i][j + index] = 2
          } else if (direction === 'South') {
            ship.cells.push([i + index, j])
            field[i + index][j] = 2
          }
        }
        ships.push(ship)
      }
    }
  }
  return ships
}


var authentication = function (password) {
  connection.query('SELECT SecretKey FROM Players WHERE SecretKey = \'' + password + '\'', function (err, rows, fields) {
    if (err) throw err
    var checkValue = function (value) {
      console.log(value)
      if (value.length === 0) {
        console.log('false!!!')
        return false
      } else {
        var dataBasePassword = value[0].SecretKey
        console.log(dataBasePassword)
        if (password === dataBasePassword) {
          return true
        } else {
          return false
        }
      }
    }
    return checkValue(rows)
  }
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
