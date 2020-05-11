import React, { useEffect } from 'react';
import clsx from 'clsx';
import { HashRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { Box, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AppNavbar from '../layout/AppNavbar';
import AppSidenav from '../layout/AppSidenav';
import Message from '../plugins/Message';
import Storage from '../plugins/Storage';
import Routes from './routes';
import { setLogin } from '../redux/userDuck';
import { setStatusSidenav } from '../redux/layoutDuck';

const Location = () => Routes.map((item, idx) => <Route key={idx} path={item.path} component={item.component} />);

const AppRouter = () => {
  const dispatch = useDispatch();
  const { widthSidenavOpen, widthSidenavClose, appSidenavStatus, loggedIn } = useSelector(state => ({
    widthSidenavOpen: state.layout.widthSidenavOpen,
    widthSidenavClose: state.layout.widthSidenavClose,
    appSidenavStatus: state.layout.appSidenavStatus,
    loggedIn: state.user.loggedIn
  }), shallowEqual);

  const history = useHistory();
  useEffect(() => {
    console.log('USE EFFECT ROUTER');
    const token = Storage.get('token');
    if (token) {
      dispatch(setLogin(true));
      dispatch(setStatusSidenav(true));
    } else {
      dispatch(setLogin(false));
      dispatch(setStatusSidenav(false));
      if (history.location.pathname !== '/login') {
        history.push('/login');
      }
    }
  }, [dispatch, history]);

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
    },
    main: {
      height: 'calc(100vh - 50px)'
    }
  }));

  const classes = useStyles();

  return (
    <Router>
      <AppNavbar/>
      <AppSidenav/>
      <Message/>
      <Box className={clsx(classes.root, {
        [classes.normalMode]: appSidenavStatus,
        [classes.compressMode]: !appSidenavStatus
      }, classes.main)}
      >
        <Fade>
          <Switch>
            <Location/>
          </Switch>
        </Fade>
      </Box>
    </Router>
  );
};

export default AppRouter;
