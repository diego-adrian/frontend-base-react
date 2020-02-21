import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components';
import Admin from '../components/admin';

const App = () => {
  const [state, setState] = useState({
    loggedIn: false 
  });

  useEffect(() => {
    const token = window.localStorage.getItem('app_token');
    console.log(token);
    if (token) {
      setState(state => ({
        ...state,
        loggedIn: true
      }));
    }
    return () => {
      console.log('DESMONTADO');
    }
  }, [state.loggedIn]);

  return(
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/logout' component={''}></Route>
        {
          state.loggedIn ? <Route exact path="/" component={Admin}/> : <Redirect to='/login'/>
        }
      </Switch>
    </Router>
  );
}

export default App;