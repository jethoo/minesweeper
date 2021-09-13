const createGrid = (row, column, bombs) => {
  let grid = []
  let bombLocation = []

  //creating the grid
  for (let i = 0; i < row; i++) {
    let innerGrid = []
    for (let j = 0; j < column; j++) {
      innerGrid.push({
        x: i,
        y: j,
        value: 0,
        isFlagged: false,
        isRevealed: false,
      })
    }
    grid.push(innerGrid)
  }

  //placing the bombs in the grid
  let bombCounter = 0
  while (bombCounter < bombs) {
    let randomX = randomNumGenerator(0, row - 1)
    let randomY = randomNumGenerator(0, column - 1)

    if (grid[randomX][randomY].value === 0) {
      grid[randomX][randomY].value = '💣'
      bombLocation.push([randomX, randomY])
      bombCounter++
    }
  }

  //calculating if bombs present in the neighbouring cell or not
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (grid[i][j].value === '💣') {
        continue
      } else {
        surroundingBombCalculator(grid, i, j, row, column)
      }
    }
  }

  return { grid, bombLocation }
}

const randomNumGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const surroundingBombCalculator = (grid, i, j, row, column) => {
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

  let neighbourBombCount = 0

  for (let k = 0; k < directions.length; k++) {
    let newI = directions[k][0] + i
    let newJ = directions[k][1] + j

    if (
      newI >= 0 &&
      newI < row &&
      newJ >= 0 &&
      newJ < column &&
      grid[newI][newJ].value === '💣'
    ) {
      neighbourBombCount++
    }
  }

  if (neighbourBombCount > 0) {
    grid[i][j].value = neighbourBombCount
  }
}

export default createGrid
