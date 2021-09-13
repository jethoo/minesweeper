import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReplayIcon from '@material-ui/icons/Replay'
import useStyles from './useStyles'
import { useSelector, useDispatch } from 'react-redux'
import { updateTopScores } from '../../reducers/MiscReducer'
import scoreService from '../../services/score'

const GameOverModal = ({ playAgain }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  //keeping track of if newscore has been updated , if it is one of the highest scores
  const [scoreUpdated, setScoreUpdated] = useState(false)

  let open = useSelector(({ misc }) => {
    return misc.gameOver
  })

  let gameendTime = useSelector(({ misc }) => {
    return misc.gameendTime
  })

  let noBombLocations = useSelector(({ nobombLocations }) => {
    return nobombLocations
  })

  let topScores = useSelector(({ misc }) => {
    return misc.topScores
  })
  //sort the scores
  topScores.sort((a,b) => a-b)

  useEffect(() => {
    //function for sending request to api and updating topscores in the store
    const updateTopScoresFunc = () => {
      let scoresArr = []
      let pushed = false
      if (topScores !== undefined) {
        scoresArr = [...topScores]
        if (
          scoresArr.length < 3 &&
          scoreUpdated === false &&
          noBombLocations === 0
        ) {
          scoresArr.push(gameendTime)
          dispatch(updateTopScores(scoresArr))
          setScoreUpdated(true)
          scoreService.create(scoresArr)
        }
        if (
          scoresArr.length >= 3 &&
          scoreUpdated === false &&
          noBombLocations === 0
        ) {
          for (let i = 0; i < scoresArr.length; i++) {
            if (gameendTime < parseInt(scoresArr[i]) && !pushed) {
              scoresArr.splice(i, 1)
              scoresArr.push(gameendTime)
              pushed = true
            }
          }
          dispatch(updateTopScores(scoresArr))
          setScoreUpdated(true)
          scoreService.create(scoresArr)
        }
      } else {
        if (scoreUpdated === false && noBombLocations === 0) {
          scoresArr.push(gameendTime)
          dispatch(updateTopScores(scoresArr))
          setScoreUpdated(true)
          scoreService.create(scoresArr)
        }
      }
    }
    updateTopScoresFunc()
  }, [dispatch, gameendTime, scoreUpdated, topScores])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <>
        <div className={classes.mainDiv}>
          <div className={classes.paper}>
            <Box color="#fff" display="flex" justifyContent="space-between">
              <Typography variant="h5">Score</Typography>
              <Typography variant="h5" className={classes.topScoreColor}>
                Top Scores
              </Typography>
            </Box>
            <Box
              color="#fff"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" className={classes.gamePlayScr}>
                {noBombLocations === 0 ? gameendTime : '0'}
              </Typography>
              <Typography variant="h5">
                <Box
                  display="flex"
                  flexDirection="column"
                  mt={1}
                  style={{ backgroundColor: 'grey' }}
                  padding={1.5}
                  borderRadius={8}
                >
                  {topScores !== undefined ? (
                    topScores.length >= 3 ? (
                      topScores.map((score, index) => {
                        return (
                          index < 3 && (
                            <Typography
                              variant="body1"
                              className={classes.topScores}
                              key={index}
                            >
                              {score}{' '}
                              <span className={classes.spans}>secs</span>
                            </Typography>
                          )
                        )
                      })
                    ) : topScores.length === 2 ? (
                      <>
                        <Typography
                          variant="body1"
                          className={classes.topScores}
                        >
                          {`${topScores[0]}`}
                          <span className={classes.spans}>secs</span>
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.topScores}
                        >
                          {`${topScores[1]}`}
                          <span className={classes.spans}>secs</span>
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body1" className={classes.topScores}>
                        {`${topScores[0]}`}
                        <span className={classes.spans}>secs</span>
                      </Typography>
                    )
                  ) : (
                    <Typography>No Score</Typography>
                  )}
                </Box>
              </Typography>
            </Box>
          </div>
          <Button
            id="transition-modal-description"
            className={classes.button}
            onClick={playAgain}
          >
            <ReplayIcon className={classes.replayIcon} />
            <Typography variant="h5">
              {' '}
              {noBombLocations === 0 ? 'Play Again' : 'Try Again'}
            </Typography>
          </Button>
        </div>
      </>
    </Modal>
  )
}

export default GameOverModal
