exports.validate = function (matrix) {
  var dreapta = 1;
  var jos = 2;
  var unpatrat = 0;
  var succes = 1;
  var failure = 0;
  var field = matrix
  var a, b, c, d;
  function checkErrors()
  {
  	for (var i = 1; i <= 10; i++)
  		for (var j = 1; j <= 10; j++)
  			if (field[i][j] == 1)
  			{
  				if (checkDirection(i, j) == dreapta)
  				{
  					if (checkAround(i, j, dreapta, checkLength(i, j, dreapta))==succes)
  					{
  						markSucces(i, j, dreapta);
  						continue;
  					}
  					else
  					{
  						return failure;
  					}
  				}
  				if (checkDirection(i, j) == jos)
  				{
  					if (checkAround(i, j, jos, checkLength(i, j, jos))==succes)
  					{
  						markSucces(i, j, jos);
  						continue;
  					}
  					else {
  						return failure;
  					}
  				}
  				if (checkDirection(i, j) == unpatrat)
  				{
  					if (checkAround(i, j, dreapta, 1)==succes)
  					{
  						markSucces(i, j, dreapta);
  						continue;
  					}
  					else {
  						return failure;
  					}
  				}
  			}
  	return succes;
  }
  function checkAround(x, y, direction, length)
  {
  	if (direction == dreapta)
  		{
  		if (field[x][--y] == 0)
  			if (field[++x][y] == 0)
  			{
  				for (var i = 0; i < length; i++)
  				{
  					if (field[x][++y] == 1)
  					{
  						return failure;
  					}
  				}
  				if (field[x][++y] == 0)
  					if (field[--x][y] == 0)
  						if (field[--x][y] == 0)
  						{
  							for (var i = 0; i < length; i++)
  							{
  								if (field[x][--y] == 1)
  								{
  									return failure;
  								}
  							}
  							if (field[x][--y] == 0)
  							{
  								markShape(length);
  								return succes;
  							}
  						}
  			}
  		return failure;
  	}

  	if (direction == jos)
  	{
  		if(field[--x][y]==0)
  			if (field[x][++y] == 0)
  			{
  				for (var i = 0; i < length; i++)
  				{
  					if (field[++x][y] == 1)
  					{
  						return failure;
  					}
  				}
  				if (field[++x][y] == 0)
  					if (field[x][--y] == 0)
  						if (field[--y][x] == 0)
  						{
  							for (var i = 0; i < length; i++)
  							{
  								if (field[--x][y] == 1)
  								{
  									return failure;
  								}
  							}
  							if (field[--x][y] == 0)
  							{
  								markShape(length);
  								return succes;
  							}
  						}
  			}
  		return failure;
  	}
  }

  function checkShipNumber()
  {
  	var sum = 0;
  	for (var i = 1; i <= 10; i++)
  		for (var j = 1; j <= 10; j++)
  			if (field[i][j] == 1)
  				sum++;
  	if (sum == 20)
  		return succes;
  	else return failure;
  }

  function checkMarkedShips()
  {
  	for (var i = 1; i <= 10; i++)
  		for (var j = 1; j <= 10; j++)
  			if (field[i][j] == 0 || field[i][j] == 5)
  			{ }
  			else return failure;
  	return succes;
  }
  function checkDirection(x, y)
  {
  	if (field[x][y + 1] == 1)
  		return dreapta;
  	if (field[x + 1][y] == 1)
  		return jos;
  	else return unpatrat;
  }

  function checkLength(x, y, direction)
  {
  	var length = 0;
  	if (direction == dreapta)
  	{
  		while (field[x][y++] == 1)
  			length++;
  	}
  	if (direction == jos)
  	{
  		while (field[x++][y] == 1)
  			length++;
  	}
  	return length;
  }

  function markSucces(x, y, direction)
  {
  	if(direction==dreapta)
  		while (field[x][y] == 1)
  		{
  			field[x][y] = 5;
  			y++;
  		}
  	if(direction==jos)
  		while (field[x][y] == 1)
  		{
  			field[x][y] = 5;
  			x++;
  		}
  }

  function markShape(length)
  {
  	if (length == 4)
  		a++;
  	else
  	if (length == 3)
  		b++;
  	else
  	if (length == 2)
  		c++;
  	else
  	if (length == 1)
  		d++;
  }

  function checkShapeNumber()
  {
  	if (a == 1 && b == 2 && c == 3 && d == 4)
  		return succes;
  	else return failure;
  }
  function totalCheck()
  {
  	if (checkShipNumber() == succes)
  	{
  		if (checkErrors() == succes)
  		{
  			if (checkMarkedShips() == succes)
  			{
  				if (checkShapeNumber() == succes);
  				return succes;
  			}
  		}
  	}
  	return failure;
  }
  function main() {
  	if (totalCheck() == succes) {
      console.log("\n\nsucces\n\n")
      return 'success!'
    }	else {
      console.log("\n\nbad field\n\n")
      return 'incorrect battleship field'
    }
  }
  return main()
}
