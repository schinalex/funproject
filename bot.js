'use strict'
const http = require('http')
const querystring = require('querystring')
const secretKey = 'super'
const hostname = '192.168.190.15'
const port = 3000

const reject = (e) => {
  console.log('problem with request:' + e.message)
}
const resolve = (chunk) => {
  console.log('BODY:' + chunk)
}

const checkIfHit = (coords, gameId) => {
  return new Promise((resolve, reject) => {
    let postData = querystring.stringify({
      secretKey: secretKey,
      gameId: gameId,
      x: coords.x,
      y: coords.y
    })

    let options = {
      hostname: hostname,
      port: port,
      path: '/shoot',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }

    let req = http.request(options, (res) => {
      console.log('STATUS: ' + res.statusCode)
      console.log('HEADERS:' + JSON.stringify(res.headers))
      res.setEncoding('utf8')
      res.on('data', resolve(chunk))
      // res.on('end', () => {
      //   console.log('No more data in response.')
      // })
    })

    req.on('error', reject(e))

    req.write(postData)
    req.end()
  })
}

checkIfHit({x: 1, y: 2}, 1)
  .then(resolve, reject)
  .then('Done')
