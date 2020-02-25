import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto'
  },
  palette: {
    primary: {
      main: '#002635'
    },
    secondary: {
      main: '#004B68'
    },
    info: {
      main: '#1680c2'
    },
    error: {
      main: '#d31419'
    },
    warning: {
      main: '#ff974f'
    },
    success: {
      main: '#449935'
    }
  } 
});

export default theme;