import React from 'react';
import Router from '../Router/Router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../plugins/Theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router/>
  </ThemeProvider>
)

export default App;
