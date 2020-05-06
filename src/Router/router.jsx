import React, { Fragment, useEffect } from 'react';
import clsx from 'clsx';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppNavbar from '../layout/AppNavbar';
import AppSidenav from '../layout/AppSidenav';
import Message from '../plugins/Message';
import Storage from '../plugins/Storage';
import Routes from './routes';
import { setLogin } from '../redux/userDuck';
import { setStatusSidenav } from '../redux/layoutDuck';

const Location = () => Routes.map((item, idx) => <Route key={idx} path={item.path} component={item.component} />);

const App = ({ loggedIn, setLogin, setStatusSidenav, widthSidenavOpen, widthSidenavClose, appSidenavStatus }) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log('USE EFFECT ROUTER');
    const token = Storage.get('token');
    if (token) {
      setLogin(true);
      setStatusSidenav(true);
    } else {
      setLogin(false);
      setStatusSidenav(false);
      history.push('/login');
    }
  }, [location, setLogin, setStatusSidenav, history]);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 0,
      margin: 0
    },
    normalMode: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: widthSidenavOpen,
      marginTop: Storage.get('token') ? 50 : 0,
      padding: Storage.get('token') ? 10 : 0
    },
    compressMode: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: loggedIn ? widthSidenavClose : 0,
      marginTop: Storage.get('token') ? 50 : 0,
      padding: Storage.get('token') ? 10 : 0
    }
  }));

  const classes = useStyles();

  return (
    <Fragment>
      <AppNavbar/>
      <AppSidenav/>
      <Message/>
      <Box className={clsx(classes.root, {
        [classes.normalMode]: appSidenavStatus,
        [classes.compressMode]: !appSidenavStatus
      })}
      >
        <Switch>
          <Location/>
        </Switch>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = ({ user: { loggedIn }, layout: { widthSidenavOpen, widthSidenavClose, appSidenavStatus } }) => ({
  loggedIn,
  widthSidenavOpen,
  widthSidenavClose,
  appSidenavStatus
});

export default connect(mapStateToProps, { setLogin, setStatusSidenav })(App);
