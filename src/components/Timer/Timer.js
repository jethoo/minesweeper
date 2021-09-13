import { useEffect } from 'react'
import useStyles from './useStyles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { handleScore, handleTimer } from '../../reducers/MiscReducer'

const Timer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  let timer = useSelector(({ misc }) => {
    return misc.timer
  })

  let gameOver = useSelector(({ misc }) => {
    return misc.gameOver
  })

  let gameendTime = useSelector(({ misc }) => {
    return misc.gameendTime
  })

  //function for displaying time
  const manageTimeDigits = (times) => {
    let timeDisplay = ''
    if (typeof times === 'number') {
      let timeAsString = times.toString(10)
      if (timeAsString.length === 1) {
        timeDisplay = `00${times}`
      } else if (timeAsString.length === 2) {
        timeDisplay = `0${times}`
      } else {
        timeDisplay = `${times}`
      }
    }
    return timeDisplay
  }

  useEffect(() => {
    if (timer > 0 && gameOver) {
      dispatch(handleScore(timer))
    }
  }, [gameOver, timer])

  useEffect(() => {
    const interval = setInterval(() => {
      increaseTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, gameOver, dispatch])

  const increaseTime = () => {
    if(gameOver === false){
      let newTime = timer + 1
      dispatch(handleTimer(newTime))
    }
  }

  return (
    <Box display="flex">
      <span role="img" aria-label="clock" className={classes.clockImage}>
        🕰
      </span>
      <Box mt={1}>
        <Typography className={classes.gameOverTime}>
          {gameOver ? manageTimeDigits(gameendTime) : manageTimeDigits(timer)}
        </Typography>
      </Box>
    </Box>
  )
}

export default Timer
