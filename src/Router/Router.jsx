import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as Routes from './components';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Routes.Login}></Route>
      <Route path="/public/oauth/login.html"></Route>
    </Switch>
  </Router>
);

export default App;