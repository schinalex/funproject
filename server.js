var express = require('express')
var app = express()
var getShips = require('./getShips.js').getShips
var validate = require('./validation.js').validate
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
    var ships = getShips(req.body.battleships)
    var validation = validate(req.body.battleships, ships)
    res.send(validation.message)
    if (validation.result) {
      insertShipsIntoDB(id, ships)
    }
  }
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
// var getId = function (password) {
//   return new Promise(function (password) {
//     connection.query('SELECT idPlayer FROM Players WHERE SecretKey = ' + connection.escape(password), function (err, rows, fields) {
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
  for (var ship of ships) {
    connection.query('INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ')', function (err, rows, fields) {
      if (err) throw err
      connection.query('SELECT id FROM mapships ORDER BY id DESC LIMIT 1', function (err, rows, fields) {
        if (err) throw err
        var idShip = rows[0].id
        for (var cell of ship.cells) {
          connection.query('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ',' + cell.x + ', ' + cell.y + ')')
        }
      })
    })
  }
}
var shoot = function (x, y) {
  // shoot at the coordinates given
}

var getPlayerId = function (password) {
  return connection.query('SELECT idPlayer FROM Players WHERE SecretKey = ?', password, function (err, rows, fields) {
    if (err) throw err
    if (rows.length === 0) {
      return false
    } else {
      return rows[0].idPlayer
    }
  })
}
