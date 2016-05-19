# Battleships

<p><strong>getGame</strong></p>
<p>
  a GET method that has a parameter a secretKey:<br>
  /getGame/secretKey
  and it returns the gameId
</p>

<p><strong>shoot</strong></p>
<p>
  a POST method <br>
  Content-Type: application/json <br>
  it expects an object of the folowing form: { secretKey: 'someKey', gameId: theGameId, x: positionX, y: positionY}<br>
  and it returns the message from the DB
</p>
