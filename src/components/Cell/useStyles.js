import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  root: {
    cursor: 'pointer',
    fontWeight: '500',
    height:'30px',
    width: '38px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
      minWidth:'10px',
      fontSize: '17px !important'
    }
  }
}))

export default useStyles