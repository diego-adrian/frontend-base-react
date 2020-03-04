import React from 'react';
import Router from '../Router/Router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../plugins/Theme';
import { CssBaseline } from '@material-ui/core';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Router/>
  </ThemeProvider>
)

export default App;
