var express = require('express')
var async = require('async')
var app = express()
var getShips = require('./getShips.js').getShips
var validate = require('./validation.js').validate
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '21032000Iulia',
  database: 'Battleship_v2'
})
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('app'))

app.post('/form-action', function (req, res) {
  //console.log(req.body)
  //console.log(req.body.password)
  var getId = getPlayerId(req.body.password)
  console.log(getId)
  getId.then(function (id) {
    if (!id) {
      res.send('no such secretKey')
    } else {
      var ships = getShips(req.body.battleships)
      var validation = validate(req.body.battleships, ships)
      res.send(validation.message)
      if (validation.result) {
        insertShipsIntoDB(id, ships)
      }
    }
  })
})
app.get('/coordinates/x=:x/y=:y', function (req, res) {
  var x = req.params.x
  var y = req.params.y
  res.send(shoot(x, y))
})
app.listen(3000, '0.0.0.0', function () {
  console.log('The server is listening on port 3000!')
})
connection.connect()

var getPlayerId = function (password) {
  var a = connection.query('SELECT idPlayer FROM Players WHERE SecretKey = \'' + password + '\'', function (err, rows, fields) {
    if (err) throw err
    if (rows.length === 0) {
      return false
    } else {
      return rows[0].idPlayer
    }
  })
  return a
}

var insertShipsIntoDB = function (idPlayer, ships) {
  for (var ship of ships) {
    callship(idPlayer, ships)
  }
}

var callship = function (idPlayer, ships) {
console.log('INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ')')
connection.query('INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ')', function (err, rows, fields) {
  if (err) throw err
  connection.query('SELECT id FROM mapships ORDER BY id DESC LIMIT 1', function (err, rows, fields) {
    if (err) throw err
    var idShip = rows[0].id
    console.log(idShip)
    for (var cell of ship.cells) {
      console.log('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ',' + cell.x + ', ' + cell.y + ')')
      connection.query('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ',' + cell.x + ', ' + cell.y + ')')
    }
  })
})
}
        // for (var cell of ship.cells) {
        //   console.log('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ',' + cell.x + ', ' + cell.y + ')')
        //   connection.query('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ',' + cell.x + ', ' + cell.y + ')')
        // }



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
//var insertShipsIntoDB = function () {
  // inserts each ship into the DB
// }
// var getPlayerId = function (password) {
//   var check = function (err, rows, fields) {
//     if (err) throw err
//     console.log(rows[0].SecretKey)
//     console.log(password)
//     if (!(rows[0].SecretKey === password)) {
//       console.log('nope')
//       return false
//     } else {
//       return rows[0].SecretKey
//     }
//   }
//   return check(null, [{SecretKey: '1234'}], null)
// }

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
