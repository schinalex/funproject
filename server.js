'use strict'

const express = require('express')
const app = express()
const getShips = require('./getShips.js').getShips
const validate = require('./validation.js').validate
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '21032000Iulia',
  database: 'Battleship_v2',
  multipleStatements: true
})
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('app'))

app.post('/form-action', (req, res) => {
  console.log(req.body)
  console.log(req.body.password)
  var getPlayer = getPlayerData(req.body.password)
  getPlayer.then((player) => {
    var id = player.idPlayer
    var registered = player.isRegistered

    console.log(id, registered)
    if (!id) {
      res.send('no such secretKey')
    } else if (registered) {
      res.send('you are already registered')
      console.log('you are alrady registered beach')
    } else {
      var ships = getShips(req.body.battleships)
      var validation = validate(req.body.battleships, ships)
      res.send(validation.message)
      if (validation.result) {
        insertShipsIntoDB(id, ships)
        updatePlayer(id, req.body.name)
      }
    }
  })
})
app.get('/coordinates/x=:x/y=:y', (req, res) => {
  var x = req.params.x
  var y = req.params.y
  res.send(shoot(x, y))
})
app.listen(3000, '0.0.0.0', () => {
  console.log('The server is listening on port 3000!')
})
connection.connect()

const insertShipsIntoDB = (idPlayer, ships) => {
  for (let ship of ships) {
    connection.query(
      'INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ');' +
      'SELECT id FROM mapships ORDER BY id DESC LIMIT 1',
      (err, rows, fields) => {
        if (err) throw err
        console.log('===>INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ')')
        var idShip = rows[1][0].id
        console.log(idShip)
        for (let cell of ship.cells) {
          console.log('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ', ' + cell.x + ', ' + cell.y + ')')
          connection.query('INSERT INTO shipcells (ShipId, X_Pos, Y_Pos) VALUES (' + idShip + ', ' + cell.x + ', ' + cell.y + ')')
        }
      }
    )
  }
}
const shoot = (playerId, x, y) => {
  // shoot at the coordinates given
}
const updatePlayer = (id, name) => {
  connection.query('UPDATE Players SET Name = ' + connection.escape(name) + ', isRegistered = 1 WHERE idPlayer = ' + id)
}

const getPlayerData = (password) => {
  return new Promise((resolve, reject) => {
    console.log('in functie' + password)
    console.log('SELECT * FROM Players WHERE SecretKey = ' + connection.escape(password))
    connection.query('SELECT * FROM Players WHERE SecretKey = ' + connection.escape(password), (err, rows, fields) => {
      if (err) throw err
      if (rows.length === 0) {
        resolve(null)
      } else {
        console.log(rows[0].isRegistered)
        resolve(rows[0])
      }
    })
  })
}
