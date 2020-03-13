import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Routes from '../Router/router';
import theme from '../plugins/Theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Router>
      <Routes/>
    </Router>
  </ThemeProvider>
);

export default App;
