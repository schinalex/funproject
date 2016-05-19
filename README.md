# Battleships
<p>
  First the player has to register the map<br>
  that can be done using the UI found on index.html page
</p>
<br>
<p><strong>getGame</strong></p>
<p>
  a GET method that has a parameter a secretKey:<br>
  /getGame/secretKey
  and it returns the gameId
</p>
<br>
<p><strong>shoot</strong></p>
<p>
  a POST method url = "/shoot"<br>
  Content-Type: application/json <br>
  it expects an object of the folowing form: { secretKey: 'someKey', gameId: theGameId, x: positionX, y: positionY}<br>
  and it returns the message from the DB
</p>
