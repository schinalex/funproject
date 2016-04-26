var express = require('express')
var app = express()
var mysql = require('mysql')

app.get('/love', function (req, res) {
  res.send('What is love!?')
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
})
connection.connect()
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err
  console.log('The solution is: ', rows[0].solution)
})
connection.end()
