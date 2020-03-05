import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppNavbar from '../layout/AppNavbar';
import AppSidenav from '../layout/AppSidenav';
import Routes from './routes';

const Location = () => Routes.map((item, idx) => <Route key={idx} path={item.path} component={item.component}></Route>);

const App = ({ loggedIn, history, widthSidenavOpen, widthSidenavClose, appSidenavStatus }) => {

  const [state, setState] = useState(false);

  useEffect(() => {
    console.log(3333333);
    if (!state) {
      console.log(44444);
      setState(loggedIn);
      history.push('/login');
    }
    return () => {
      console.log('9999999999999');
    }
  }, [state]);

  const useStyles = makeStyles(theme => ({
    root: {
      padding: 0,
      margin: 0,
      marginTop: 50
    },
    normalMode: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: widthSidenavOpen,
    },
    compressMode: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: widthSidenavClose,
    }
  }));

  const classes = useStyles();

  return(
    <Fragment>
      <AppNavbar/>
      <AppSidenav/>
      <Box className={clsx(classes.root, {
        [classes.normalMode]: appSidenavStatus,
        [classes.compressMode]: !appSidenavStatus
      })}>
        <Switch>
          <Location/>
        </Switch>
      </Box>
    </Fragment>
  );
}

const mapStateToProps = ({user: { loggedIn}, layout: { widthSidenavOpen, widthSidenavClose, appSidenavStatus}}) => ({
  loggedIn,
  widthSidenavOpen,
  widthSidenavClose,
  appSidenavStatus
});

export default withRouter(connect(mapStateToProps)(App));
