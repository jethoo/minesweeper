let nobombCells

const show = (grid, i, j, column, row, noBombLocations) => {
  nobombCells = parseInt(noBombLocations)
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
  ]

  if (grid[i][j].isFlagged === false) {
    grid[i][j].isRevealed = true
    nobombCells--
  }

  for (let k = 0; k < directions.length; k++) {
    let newI = directions[k][0] + i
    let newJ = directions[k][1] + j

    if (
      newI >= 0 &&
      newI < row &&
      newJ >= 0 &&
      newJ < column &&
      grid[newI][newJ].isRevealed === false &&
      grid[newI][newJ].value !== '💣'
    ) {
      if (
        grid[newI][newJ].value !== 0 &&
        grid[newI][newJ].isFlagged === false
      ) {
        nobombCells--
        grid[newI][newJ].isRevealed = true
      }
      if (
        grid[newI][newJ].value === 0 &&
        grid[newI][newJ].isFlagged === false
      ) {
        show(grid, newI, newJ, column, row, nobombCells)
      }
    }
  }
  return { grid, nobombCells }
}

export default show