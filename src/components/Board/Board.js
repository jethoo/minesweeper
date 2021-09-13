import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import useStyles from './useStyles'
import Cell from '../Cell/Cell'
import GameOverModal from '../Modal/Modal'
import backgroundColor from '../../helpers/backgroundColor'
import color from '../../helpers/color'
import checkNeighbourBorder from '../../helpers/checkNeighbourBorder'
import { useDispatch, useSelector } from 'react-redux'
import { createBoard } from '../../reducers/BoardReducer'
import { addNoBombLocation } from '../../reducers/NoBombReducer'
import {
  gameOverFunc,
  gameOverModal,
  handleFlags
} from '../../reducers/MiscReducer'
import TopBar from '../TopBar/TopBar'
import { handleTopScores, muteSound, handleTimer } from '../../reducers/MiscReducer'
import { Typography } from '@material-ui/core'

const Board = () => {
  let row = 16
  let column = 16

  const classes = useStyles()
  const dispatch = useDispatch()

  let grid = useSelector(({ board }) => {
    return board.grid
  })

  let gameOver = useSelector(({ misc }) => {
    return misc.gameOver
  })

  let open = useSelector(({ misc }) => {
    return misc.open
  })

  let difficulty = useSelector(({ misc }) => {
    return misc.gameMode
  })

  let bombsTotal = difficulty === 'Medium' ? 40 : difficulty === 'Easy' ? 20 : 60

  useEffect(() => {
    renderGrid()
  }, [bombsTotal])

  const renderGrid = () => {
    dispatch(createBoard(row, column, bombsTotal))
    dispatch(addNoBombLocation(row, column, bombsTotal))
    dispatch(handleFlags(bombsTotal))
    dispatch(handleTopScores())
    dispatch(handleTimer(0))
  }

  const playAgain = () => {
    renderGrid()
    dispatch(gameOverFunc(false))
    dispatch(handleFlags(bombsTotal))
    dispatch(gameOverModal(false))
    dispatch(muteSound(false))
  }

  return grid.length ? (
    <div className={classes.firstRoot}>
      <Typography className={classes.gameName} variant='h6'>Minesweeper</Typography>
      <div className={classes.secondRoot}>
        <TopBar playAgain={playAgain}/>
        {gameOver && open && <GameOverModal playAgain={playAgain} />}
        {grid.map((firstIndexItem, outerIndex) => {
          return (
            <Box display="flex" key={outerIndex}>
              {firstIndexItem.map((innerIndexItem, innerIndex) => {
                return (
                  <Cell
                    key={innerIndex}
                    eachItem={innerIndexItem}
                    column={column}
                    row={row}
                    backgroundColor={backgroundColor(
                      innerIndex,
                      outerIndex,
                      innerIndexItem
                    )}
                    color={color(innerIndexItem)}
                    borderLeft={
                      innerIndexItem.isRevealed
                        ? checkNeighbourBorder(innerIndexItem, grid)
                          .borderLeft
                        : ''
                    }
                    borderRight={
                      innerIndexItem.isRevealed
                        ? checkNeighbourBorder(innerIndexItem, grid)
                          .borderRight
                        : ''
                    }
                    borderBottom={
                      innerIndexItem.isRevealed
                        ? checkNeighbourBorder(innerIndexItem, grid)
                          .borderBottom
                        : ''
                    }
                    borderTop={
                      innerIndexItem.isRevealed
                        ? checkNeighbourBorder(innerIndexItem, grid).borderTop
                        : ''
                    }
                    fontSize={innerIndexItem.value === '💣' ? '18px' : '25px'}
                  >
                    {!innerIndexItem.isRevealed &&
                      innerIndexItem.isFlagged ? (
                        <span className={classes.flagFont}>🚩</span>
                      ) : innerIndexItem.isRevealed &&
                        innerIndexItem.value !== 0 ? (
                          innerIndexItem.value
                        ) : (
                          ''
                        )}
                  </Cell>
                )
              })}
            </Box>
          )
        })}
      </div>
    </div>
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
      <CircularProgress />
    </Box>
  )
}

export default Board
