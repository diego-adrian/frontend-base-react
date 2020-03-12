import React from 'react';
import Routes from '../Router/router';
import { HashRouter as Router} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../plugins/Theme';
import { CssBaseline } from '@material-ui/core';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Router>
      <Routes/>
    </Router>
  </ThemeProvider>
)

export default App;
