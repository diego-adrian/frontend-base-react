import { createMuiTheme } from '@material-ui/core/styles';
import { sansation, titilliumWebLight, titilliumWebRegular, titilliumWebBold} from './fonts';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', 'Sansation', 'Titillium Web'].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [sansation, titilliumWebLight, titilliumWebRegular, titilliumWebBold],
      },
    }
  },
  palette: {
    primary: {
      main: '#002635',
      dark: '#001016'
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