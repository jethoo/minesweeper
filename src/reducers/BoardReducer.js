import createGrid from '../helpers/createGrid'

const initialState = {
  grid: [],
  bombLocations: [],
}
const BoardReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BOARD':
    return Object.assign({}, state, {
      grid: action.data.grid,
      bombLocations: action.data.bombLocation,
    })

  case 'UPDATE_BOARD':
    return Object.assign({}, state, {
      grid: action.data,
      bombLocations: [...state.bombLocations],
    })

  default:
    return state
  }
}

//intializing the board
export const createBoard = (row, column, totalBombs) => {
  const grid = createGrid(row, column, totalBombs)
  return {
    type: 'NEW_BOARD',
    data: grid,
  }
}

//updating the board
export const updateBoard = (grid) => {
  return {
    type: 'UPDATE_BOARD',
    data: grid,
  }
}

export default BoardReducer
