import { makeStyles } from '@material-ui/core/styles'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  firstRoot: {
    display: 'flex',
    flexDirection:'column !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    marginTop:50,
    textAlign: 'center',
  },
  secondRoot: {
    borderRight: '2px solid black',
    borderBottom: '2px solid black',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    width: 'auto',
  },
  flagFont: {
    fontSize: '30px'
  },
  gameName: {
    fontWeight: '550 !important',
    marginBottom: '15px !important'
  }
}))

export default useStyles
