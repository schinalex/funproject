var express = require('express')
var app = express()
var validate = require('./eugen.js').validate
var paddingZeros = require('./transform.js').paddingZeros
// var mysql = require('mysql')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('app'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

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

var authentication = function (password) {
  var dataBasePassword = 'password'
  if (password === dataBasePassword) {
    return true
  } else {
    return false
  }
}

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '21032000Iulia',
//   database: 'battleship'
// })
// connection.connect()
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
