import React,{Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { orange } from '@material-ui/core/colors';

const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);
  
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    },
  }))(Button);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    outline: {
      outline: 'none!important',
    },
  }));
  
  const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });
  
  export default function CustomizedButtons(props) {
    const classes = useStyles();
    console.log(props);
  
    const parentOnLoginHandler = props.parentOnLoginHandler;
    
    return (
      <div>
        <Button variant="outlined" color="primary" type="button" className={classes.outline}
        onClick={parentOnLoginHandler}>
                    Sign in
        </Button>
      </div>
    );
  }
