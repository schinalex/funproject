var express = require('express')
var app = express()
var validate = require('./eugen.js').validate
var paddingZeros = require('./transform.js').paddingZeros
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

var authentication = function (password) {
  var getValue = function () {
    return new Promise(function (resolve, reject) {
      var value = queryDB('SELECT SecretKey FROM Players WHERE SecretKey = \'' + password + '\'')
      resolve(value)
      reject('Ow... ')
    })
  }
  getValue().then(function (value) {
    console.log(value)
    if (!value) {
      console.log('false!!!')
      return false
    } else {
      console.log('am intrat! biatch')
      var dataBasePassword = value[0].SecretKey
      console.log(dataBasePassword)
      if (password === dataBasePassword) {
        return true
      } else {
        return false
      }
    }
  })
}

// var updatePlayer = function (name, secretKey) {
//   var id = queryDB('SELECT IdPlayer FROM Players WHERE SecretKey = \'' + secretKey + '\'')
//   queryDB('UPDATE Players SET Name = \'' + name + '\' WHERE idPlayer = ' + id)
// }

var queryDB = function (query) {
  connection.query(query, function (err, rows, fields) {
    if (err) { console.log(err) }
    console.log('wtf' + rows)
    return rows
  })
}

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
//
// connection.end()
//
// ===========================
// 
// var field = []
// var getLength = function (x, y) {
//   var length = 0
//   if (field[x][y + 1] === 1) {
//     while (field[x][y++] === 1) {
//       length++
//     }
//   } else if (field[x + 1][y] === 1) {
//     while (field[x++][y] === 1) {
//       length++
//     }
//   }
//   return length
// }
//
// var idMap = 1, idGameShip = 1, PlayerId = 1, shiptype = 1234
// for (var i = 0; i <= 12 ; i++) {
//   for (var j = 0; j <= 12; j++) {
//     if (field[i][j] === 1) {
//       if (field[i][j + 1] === 1) {  //dreapta
//         {
//           connection.query('INSERT INTO MapShips (PlayerId, ShipType) VALUES (PlayerId, length)', function (err, rows, fields) {
//             if (err) throw err
//               console.log(rows)
//             })
//           var t = j
//           while (field[i][t] !== 0) {
//             connection.query('INSERT INTO ShipCells (ShipId, X_Pos, Y_Pos) SELECT () ', function (err, rows, fields) {
//               if (err) throw err
//                 console.log(rows)
//               })
//             t++
//           }
//         }
//       }
//       else if(field[i+1][j] === 1) {  //jos
//         connection.query('INSERT INTO MapShips (id, idGameShip, idPlayer, shipType) VALUES (idMap, idGameShip, idPlayer, shipType)', function (err, rows, fields) {
//           if (err) throw err
//             console.log(rows)
//           })
//         var t = i
//         while (field[t][j] !== 0) {
//           connection.query('INSERT INTO GameShipCells (idGameShip, X_POS, Y_POS) VALUES (idGameShip, t, j)', function (err, rows, fields) {
//             if (err) throw err
//               console.log(rows)
//             })
//           t++
//         }
//       } else {
//         connection.query('INSERT INTO GameShips (idMap, idGameShip, idPlayer, shipType) VALUES (idMap, idGameShip, idPlayer, shipType)', function (err, rows, fields) {
//           if (err) throw err
//             console.log(rows)
//         })
//         connection.query('INSERT INTO GameShipCells (idGameShip, X_POS, Y_POS) VALUES (idGameShip, i, j)', function (err, rows, fields) {
//           if (err) throw err
//           console.log(rows)
//         })
//       }
//     }
//   }
// }
//
//
