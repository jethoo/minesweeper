
const initialState = 0
const NoBombReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIAL':
    return action.data
  case 'ONLYONE_UPDATE':
    return action.data
  case 'MANY_REVEALED':
    return action.data
  default:
    return state
  }
}

//initial no bomb locations when game starts
export const addNoBombLocation = (row,column,bombsTotal) => {
  const result = ((row * column) - bombsTotal)
  return {
    type: 'INITIAL',
    data: result
  }
}

//update locations without bomb value when game is ongoing
export const updateOne = (noBombLocations) => {
  const result = noBombLocations - 1
  return {
    type: 'ONLYONE_UPDATE',
    data: result
  }
}
//update no bomb locations when many cells are revealed at once
export const updateMany = (nobombCells) => {
  return {
    type: 'MANY_REVEALED',
    data: nobombCells
  }
}

export default NoBombReducer
