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
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c'
    }
  }
});

export default theme;
