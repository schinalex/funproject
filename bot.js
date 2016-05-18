var postData = querystring.stringify({
  secretKey: 'super',
  gameId: '1',
  x: 1,
  y: 1
})

var options = {
  hostname: 'www.google.com',
  port: 3000,
  path: '/shoot',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
}

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`)
  })
  res.on('end', () => {
    console.log('No more data in response.')
  })
})

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`)
})

// write data to request body
req.write(postData)
req.end()
