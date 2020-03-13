import { createMuiTheme } from '@material-ui/core/styles';
import { sansation, titilliumWebLight, titilliumWebRegular, titilliumWebBold } from './fonts';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Titillium Web'].join(',')
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
      main: '#004B68',
      dark: '#001219'
    },
    info: {
      main: '#1680c2',
      light: '#E2F0F8'
    },
    error: {
      main: '#d31419'
    },
    warning: {
      main: '#ff974f',
      dark: '#F5924C'
    },
    success: {
      main: '#449935'
    }
  }
});

export default theme;
