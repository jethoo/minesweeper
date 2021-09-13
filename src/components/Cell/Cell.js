import useStyles from './useStyles'
import Box from '@material-ui/core/Box'
import show from '../../helpers/show'
import { updateOne, updateMany } from '../../reducers/NoBombReducer'
import { useDispatch, useSelector } from 'react-redux'
import { gameOverFunc, gameOverModal, handleFlags } from '../../reducers/MiscReducer'
import { updateBoard } from '../../reducers/BoardReducer'
import clickTrack from '../../sounds/click.wav'
import gameOverTrack from '../../sounds/gameOver.wav'
import zeroTrack from '../../sounds/zero.wav'

const Cell = ({
  eachItem,
  backgroundColor,
  color,
  borderLeft,
  borderRight,
  borderBottom,
  borderTop,
  fontSize,
  column,
  row,
  children
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  let grid = useSelector(({ board }) => {
    return board.grid
  })

  let gameOver = useSelector(({ misc }) => {
    return misc.gameOver
  })

  let noBombLocations = useSelector(({ nobombLocations }) => {
    return nobombLocations
  })

  let bombLocations = useSelector(({ board }) => {
    return board.bombLocations
  })

  let flags = useSelector(({ misc }) => {
    return misc.flaggedTotal
  })


  let mute = useSelector(({ misc }) => {
    return misc.mute
  })


  //function for revealing each cell value when clicked
  const showCellValue = (x, y) => {
    const clickAudio = new Audio(zeroTrack)
    const gameOverAudio = new Audio(gameOverTrack)

    let newGrid = JSON.parse(JSON.stringify(grid))
    if (newGrid[x][y].isRevealed || gameOver) {
      return
    }
    if (newGrid[x][y].value !== '💣' && noBombLocations === 1) {
      dispatch(gameOverFunc(true))
      setTimeout(() => {
        dispatch(gameOverModal(true))
      }, 1000)
      mute ? clickAudio.pause() : clickAudio.play()
    }
    if (newGrid[x][y].value === '💣' && newGrid[x][y].isFlagged === false) {

      mute ? gameOverAudio.pause() : gameOverAudio.play()
      for (let i = 0; i < bombLocations.length; i++) {
        newGrid[bombLocations[i][0]][bombLocations[i][1]].isRevealed = true
      }
      dispatch(updateBoard(newGrid))
      dispatch(gameOverFunc(true))
      setTimeout(() => {
        dispatch(gameOverModal(true))
      }, 1000)
    }
    if (
      newGrid[x][y].value !== 0 &&
      newGrid[x][y].isRevealed === false &&
      newGrid[x][y].value !== '💣' &&
      newGrid[x][y].isFlagged === false
    ) {
      newGrid[x][y].isRevealed = true
      dispatch(updateBoard(newGrid))
      dispatch(updateOne(noBombLocations))
      mute ? clickAudio.pause() : clickAudio.play()
    }
    if (newGrid[x][y].value === 0) {
      //passing the clicked cell position to show function in helpers folder
      //when the position value is '0', need to reveal all other surrounding '0' value cells
      let newRevealedGrid = show(newGrid, x, y, column, row, noBombLocations)
      dispatch(updateBoard(newRevealedGrid.grid))
      dispatch(updateMany(newRevealedGrid.nobombCells))
      if (newRevealedGrid.nobombCells === 0) {
        dispatch(gameOverModal(true))
      }
      const zeroTrackAudio = new Audio(clickTrack)
      mute ? zeroTrackAudio.pause() : zeroTrackAudio.play()
    }
  }

  //function for handling adding and removing flags in the cell
  const addFlag = (e, x, y) => {
    const clickAudio = new Audio(zeroTrack)
    mute ? clickAudio.pause() : clickAudio.play()
    e.preventDefault()
    let newGrid = JSON.parse(JSON.stringify(grid))
    if (newGrid[x][y].isRevealed === false) {
      if (newGrid[x][y].isFlagged === false) {
        newGrid[x][y].isFlagged = true
        dispatch(updateBoard(newGrid))
        let newFlaggedTotal = flags - 1
        dispatch(handleFlags(newFlaggedTotal))

      } else {
        newGrid[x][y].isFlagged = false
        dispatch(updateBoard(newGrid))
        let newFlaggedTotal = flags + 1
        dispatch(handleFlags(newFlaggedTotal))
      }
    }
  }


  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: backgroundColor,
        color: color,
        borderLeft: borderLeft,
        borderRight: borderRight,
        borderBottom: borderBottom,
        borderTop: borderTop,
        fontSize: fontSize,
      }}
      onClick={() => showCellValue(eachItem.x, eachItem.y)}
      onContextMenu={(event) => addFlag(event, eachItem.x, eachItem.y)}
    >
      {children}
    </Box>
  )
}

export default Cell
