const backgroundColor = (innerIndex, outerIndex, eachItem) => {
  if ((innerIndex + outerIndex) % 2 === 0 && eachItem.isRevealed === false) {
    return '#a1d149'
  } else if (
    (innerIndex + outerIndex) % 2 === 0 &&
    eachItem.isRevealed === true
  ) {
    return '#dbb997'
  } else if (
    (innerIndex + outerIndex) % 2 !== 0 &&
    eachItem.isRevealed === false
  ) {
    return '#97ca40'
  } else {
    return '#cdaf8a'
  }
}

export default backgroundColor
