import { makeStyles } from "@material-ui/core";

const drawerWidth = 175

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: '#000',
    position: 'relative'
  },
  appBar: {
    width: `calc(100% + ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'linear-gradient(90deg, rgba(166,38,70,1) 0%, rgba(249,91,0,0.927608543417367) 48%, rgba(249,249,249,0.7651435574229692) 97%)'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  title:{
    flexGrow: 1
  },
  button: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: '#df691a',
    height: 30,
    padding: '0 30px',
    margin: 'auto 50% auto auto',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
  },
}));