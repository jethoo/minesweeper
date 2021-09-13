import scoreService from '../services/score'

const initialState = {
  gameOver: false,
  open: false,
  flaggedTotal: null,
  gameendTime: 0,
  topScores: null,
  mute: false,
  gameMode: 'Medium',
  timer: 0
}
const MiscReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GAME_OVER':
    return Object.assign({}, state, {
      gameOver: action.data,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: state.topScores,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'GAME_OVER_MODAL':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: action.data,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: state.topScores,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'HANDLE_FLAG':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: action.data,
      gameendTime: state.gameendTime,
      topScores: state.topScores,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'HANDLE_SCORE':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: action.data,
      topScores: state.topScores,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'GET_TOPSCORES':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: action.data,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'UPDATE_TOPSCORES':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: action.data,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'MUTE_SOUND':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: state.topScores,
      mute: action.data,
      gameMode: state.gameMode,
      timer: state.timer
    })

  case 'GAME_TYPE':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: state.topScores,
      mute: state.mute,
      gameMode: action.data,
      timer: state.timer
    })

  case 'HANDLE_TIMER':
    return Object.assign({}, state, {
      gameOver: state.gameOver,
      open: state.open,
      flaggedTotal: state.flaggedTotal,
      gameendTime: state.gameendTime,
      topScores: state.topScores,
      mute: state.mute,
      gameMode: state.gameMode,
      timer: action.data
    })

  default:
    return state
  }
}

//game over function
export const gameOverFunc = (val) => {
  return {
    type: 'GAME_OVER',
    data: val,
  }
}

//handle gameover modal
export const gameOverModal = (val) => {
  return {
    type: 'GAME_OVER_MODAL',
    data: val,
  }
}

//handle flags
export const handleFlags = (val) => {
  return {
    type: 'HANDLE_FLAG',
    data: val,
  }
}

//handle score
export const handleScore = (val) => {
  return {
    type: 'HANDLE_SCORE',
    data: val,
  }
}

//handle get top scores
export const handleTopScores = () => {
  return async (dispatch) => {
    const result = await scoreService.getAll()
    dispatch({
      type: 'GET_TOPSCORES',
      data: result,
    })
  }
}

//update top scores
export const updateTopScores = (arr) => {
  return {
    type: 'UPDATE_TOPSCORES',
    data: arr,
  }
}

//mute the sound
export const muteSound = (val) => {
  return {
    type: 'MUTE_SOUND',
    data: val,
  }
}

//change game's difficulty
export const gameType = (val) => {
  return {
    type: 'GAME_TYPE',
    data: val,
  }
}

//handle timer
export const handleTimer = (val) => {
  return {
    type: 'HANDLE_TIMER',
    data: val
  }
}

export default MiscReducer
