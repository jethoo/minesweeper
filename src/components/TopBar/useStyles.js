import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( () => ({
  headerBox: {
    backgroundColor: '#4a752c',
    height: '70px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flag: {
    marginRight: 10,
    fontSize: '38px',
  },
  flaggedTotal: {
    marginRight: 20,
    marginTop: 10,
  },
  shareIcon: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#fff'
  },
  select: {
    '&.MuiSelect-select:focus': {
      backgroundColor: '#fff'
    },
    color: '#333'
  }

}))

export default useStyles