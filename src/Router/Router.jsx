import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from './components';
import Header from '../layout/Header';
import Main from '../components/Main';

const App = ({loggedIn }) => {
  return(
    <Router>
      <Header/>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/logout' component={''}></Route>
        {
          loggedIn ? <Route path="/" component={Main}/> : <Redirect to='/login'/>
        }
      </Switch>
    </Router>
  );
}

const mapStateToProps = ({user: { loggedIn}}) => ({
  loggedIn
});

export default connect(mapStateToProps)(App);