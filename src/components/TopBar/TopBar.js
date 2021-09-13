import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeMuteIcon from '@material-ui/icons/VolumeMute'
import ShareIcon from '@material-ui/icons/Share'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import useStyles from './useStyles'
import { useSelector, useDispatch } from 'react-redux'
import Timer from '../Timer/Timer'
import { muteSound, gameType } from '../../reducers/MiscReducer'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const TopBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  let difficulty = useSelector(({ misc }) => {
    return misc.gameMode
  })

  const handleChange = (event) => {
    dispatch(gameType(event.target.value))
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  let flags = useSelector(({ misc }) => {
    return misc.flaggedTotal
  })

  let mute = useSelector(({ misc }) => {
    return misc.mute
  })

  const handleSound = () => {
    dispatch(muteSound(!mute))
  }

  return (
    <Box className={classes.headerBox}>
      <Button
        variant="contained"
        size="medium"
        className={classes.button}
      >
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={difficulty}
          onChange={handleChange}
          className={classes.select}
          disableUnderline
        >
          <MenuItem value={'Easy'}>Easy</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'Hard'}>Hard</MenuItem>
        </Select>
      </Button>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        color="#fff"
      >
        <span className={classes.flag}>🚩</span>
        <Typography variant="h5" className={classes.flaggedTotal}>
          {flags}
        </Typography>
        <Timer />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        color="#fff"
        justifyContent="space-between"
        mr={2}
      >
        <div onClick={handleSound}>
          {mute ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </div>

        <ShareIcon className={classes.shareIcon} />
        <CloseIcon />
      </Box>
    </Box>
  )
}

export default TopBar
