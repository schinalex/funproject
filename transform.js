exports.paddingZeros = function (matrix) {
  var n = matrix.length + 2
  var newMatrix = []
  for (var i = 0; i < n; i++) {
    var row = []
    for (var j = 0; j < n; j++) {
      if (i === 0 || i === n - 1 || j === 0 || j === n - 1) {
        row.push(0)
      } else {
        row.push(matrix[i - 1][j - 1])
      }
    }
    newMatrix.push(row)
  }
  return newMatrix
}
