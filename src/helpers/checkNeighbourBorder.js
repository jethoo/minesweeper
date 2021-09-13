const checkNeighbourBorder = (eachItem, grid) => {
  let borderLeft, borderRight, borderTop, borderBottom
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  if (
    eachItem.x + directions[0][0] >= 0 &&
    eachItem.x + directions[0][0] < 16 &&
    eachItem.y + directions[0][1] >= 0 &&
    eachItem.y + directions[0][1] < 16
  ) {
    if (
      grid[eachItem.x + directions[0][0]][eachItem.y + directions[0][1]]
        .isRevealed === false
    ) {
      borderRight = '1px solid green'
    } else {
      borderRight = 'none'
    }
  }

  if (
    eachItem.x + directions[1][0] >= 0 &&
    eachItem.x + directions[1][0] < 16 &&
    eachItem.y + directions[1][1] >= 0 &&
    eachItem.y + directions[1][1] < 16
  ) {
    if (
      grid[eachItem.x + directions[1][0]][eachItem.y + directions[1][1]]
        .isRevealed === false
    ) {
      borderLeft = '1px solid green'
    } else {
      borderLeft = 'none'
    }
  }

  if (
    eachItem.x + directions[2][0] >= 0 &&
    eachItem.x + directions[2][0] < 16 &&
    eachItem.y + directions[2][1] >= 0 &&
    eachItem.y + directions[2][1] < 16
  ) {
    if (
      grid[eachItem.x + directions[2][0]][eachItem.y + directions[2][1]]
        .isRevealed === false
    ) {
      borderBottom = '1px solid green'
    } else {
      borderBottom = 'none'
    }
  }

  if (
    eachItem.x + directions[3][0] >= 0 &&
    eachItem.x + directions[3][0] < 16 &&
    eachItem.y + directions[3][1] >= 0 &&
    eachItem.y + directions[3][1] < 16
  ) {
    if (
      grid[eachItem.x + directions[3][0]][eachItem.y + directions[3][1]]
        .isRevealed === false
    ) {
      borderTop = '1px solid green'
    } else {
      borderTop = 'none'
    }
  }

  return { borderLeft, borderRight, borderTop, borderBottom }
}

export default checkNeighbourBorder
