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
  if (!req.body.password || !req.body.name) {
    res.send('please write the Name and the SecretKey')
  } else {
    console.log(req.body)
    console.log(req.body.password)
    getPlayerData(req.body.password)
      .then((player) => {
        var id = player.idPlayer
        var registered = player.isRegistered
        if (!id) {
          res.send('no such secretKey')
        } else if (registered) {
          res.send('you are already registered')
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
  }
})

app.get('/getGame/:secretKey', (req, res) => {
  console.log(req.params)
  console.log(req.params.secretKey)
  getGame(req.params.secretKey)
    .then(res.send)
})

app.post('/shoot', (req, res) => {
  var x = req.body.x
  var y = req.body.y
  var secretKey = req.body.secretKey
  var gameId = req.body.gameId
  shoot(secretKey, gameId, x, y)
    .then(console.log.bind(console))
})

app.listen(3000, '0.0.0.0', () => {
  connection.connect()
  console.log('The server is listening on port 3000!')
})

const insertShipsIntoDB = (idPlayer, ships) => {
  for (let ship of ships) {
    connection.query(
      'INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ');' +
      'SELECT id FROM mapships ORDER BY id DESC LIMIT 1',
      (err, rows, fields) => {
        if (err) throw err
        console.log('==>INSERT INTO mapships (PlayerId, ShipType) VALUES  (' + idPlayer + ', ' + ship.size + ')')
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

const shoot = (secretKey, gameId, x, y) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'CALL spGameHit (?, ?,?,?, @isError, @Message);' +
      'SELECT @isError as isErrror, @Message as isMessage;', [secretKey, gameId, x, y], (err, rows, fields) => {
        if (err) throw err
        resolve(rows[0].Message)
      }
    )
  })
}

const updatePlayer = (id, name) => {
  connection.query('UPDATE Players SET Name = ' + connection.escape(name) + ', isRegistered = 1 WHERE idPlayer = ' + id)
}

const getPlayerData = (password) => {
  return new Promise((resolve, reject) => {
    console.log('SELECT * FROM Players WHERE SecretKey = ' + connection.escape(password))
    connection.query('SELECT * FROM Players WHERE SecretKey = ' + connection.escape(password), (err, rows, fields) => {
      if (err) throw err
      if (rows.length === 0) {
        resolve(null)
      } else {
        resolve(rows[0])
      }
    })
  })
}

const getGame = (secretKey) => {
  return new Promise((resolve, reject) => {
    console.log('select * From vwAvaiablePlayerGames WHERE secretKey = ' + connection.escape(secretKey) + '  LIMIT 0, 1;')
    connection.query('select * From vwAvaiablePlayerGames WHERE secretKey = ' + connection.escape(secretKey) + '  LIMIT 0, 1;', (err, rows, fields) => {
      if (err) throw err
      // console.log(rows)
      if (rows.length === 0) {
        resolve(null)
      } else {
        // console.log(rows[0].IdPlayer_Opponent)
        resolve(String(rows[0].IdPlayer_Opponent))
      }
    })
  })
}
