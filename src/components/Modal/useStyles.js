import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'inherit',
      marginTop: '50px',
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: '5px',
    backgroundImage: 'url(https://www.google.com/logos/fnbx/minesweeper/lose_screen.png)',
    objectFit: 'contain',
    minHeight: '24vh',
    minWidth: '20vw',
  },
  mainDiv: {
    border: 'none',
    width: 'auto',
    minWidth: '250px',
  },
  button: {
    backgroundColor: '#134503',
    width: '100%',
    height: '60px',
    marginTop: '10px',
    color: '#fff',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#134503',
      color: '#fff',
    },
  },
  replayIcon: {
    marginRight: '15px',
  },
  topScoreColor: {
    color: '#333',
  },
  gamePlayScr: {
    marginLeft: '20px',
    marginRight: '20px',
    fontWeight: '900',
    fontSize: '40px',
    marginTop: '-8%',
  },
  topScores: {
    fontWeight: 'bold',
    fontSize: '22px',
  },
  spans: {
    color: '#333',
    fontSize: '13px',
    marginLeft: '5px',
  },
}))

export default useStyles
