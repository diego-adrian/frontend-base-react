import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Drawer,
  List,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  CardContent,
  MenuItem,
  Menu,
  Box,
  Card,
  withWidth
} from '@material-ui/core';
import { AssignmentInd, FolderShared, Folder, FolderOpen } from '@material-ui/icons';
import { setLogin } from '../redux/userDuck';
import { setStatusSidenav } from '../redux/layoutDuck';
import Storage from '../plugins/Storage';

const Sidenav = ({ width }) => {
  const Routes = Storage.get('menu') || [];
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedIn, isOpen, widthSidenavOpen, widthSidenavClose, appSidenavStatus } = useSelector(state => ({
    loggedIn: state.user.loggedIn,
    isOpen: state.layout.isOpen,
    widthSidenavOpen: state.layout.widthSidenavOpen,
    widthSidenavClose: state.layout.widthSidenavClose,
    appSidenavStatus: state.layout.appSidenavStatus
  }), shallowEqual);
  const [itemSelected, setItemSelected] = useState(0);
  const [state, setState] = useState({
    popupUserInfo: null,
    title: 'frontend base',
    user: Storage.getUser()
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    appSidenav: {
      width: widthSidenavOpen,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      borderRight: 0
    },
    appSidenavOpen: {
      width: widthSidenavOpen,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    appSidenavClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: widthSidenavClose,
      '&:hover': {
        width: widthSidenavOpen
      }
    },
    appearance: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.secondary.dark
    },
    links: {
      textDecoration: 'none',
      '& span': {
        color: '#FFF',
        fontSize: '14px'
      }
    },
    selectItem: {
      backgroundColor: theme.palette.info.main,
      '& svg': {
        color: '#FFF',
        opacity: 1
      }
    },
    card: {
      outline: 'none'
    },
    btnUserInfo: {
      background: theme.palette.info.main,
      borderRadius: '50%',
      padding: 0,
      margin: 0,
      width: 35,
      marginRight: 5,
      minWidth: 35,
      height: 35,
      minHeight: 35,
      color: '#FFF',
      '&:hover': {
        background: theme.palette.info.main,
      }
    },
    btnUserInfoCard: {
      padding: 0,
      margin: 0,
      width: 40,
      minWidth: 40,
      height: 40,
      minHeight: 40,
      color: theme.palette.info.main,
    },
    header: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.primary.dark
    },
    title: {
      textAlign: 'center',
      color: '#FFF',
      textTransform: 'uppercase'
    },
    logout: {
      color: theme.palette.error.main,
      fontWeight: 400
    },
    icon: {
      color: theme.palette.warning.light,
      opacity: 1
    }
  }));

  const handleUserInfo = (event) => {
    setState((state) => ({
      ...state,
      popupUserInfo: event.currentTarget
    }));
  };

  const handleCloseDrawer = () => {
    dispatch(setStatusSidenav(false));
  };

  const handleCloseUserInfo = () => {
    setState((state) => ({
      ...state,
      popupUserInfo: null
    }));
  };
  const logout = () => {
    Storage.clean();
    dispatch(setLogin(false));
    dispatch(setStatusSidenav(false));
    setState((state) => ({
      ...state,
      popupUserInfo: null
    }));
    if (history.location.pathname !== '/login') {
      history.push('/login');
    }
  };

  const classes = useStyles();

  const Options = () => (
    <Fragment>
      <List aria-label="header" className={classes.header}>
        <ListItem
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          <Button
            className={classes.btnUserInfo}
            aria-controls="user-info"
            aria-haspopup="true"
            onClick={handleUserInfo}
          >
            { state.title ? state.title.charAt(0) : '' }
          </Button>
          <Menu
            id="user-info"
            anchorEl={state.popupUserInfo}
            keepMounted
            open={Boolean(state.popupUserInfo)}
            onClose={handleCloseUserInfo}
            PaperProps={{
              style: {
                width: 260
              }
            }}
          >
            <Card elevation={0} className={classes.card}>
              <CardContent style={{ padding: 8 }}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                  <Box>
                    <AssignmentInd className={classes.btnUserInfoCard}/>
                  </Box>
                  <Box marginLeft={1}>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                      { state.user && state.user.nombres ? `${state.user.nombres} ${state.user.primer_apellido} ${state.user.segundo_apellido}` : 'USUARIO LOGUEADO S/N' }
                    </Box>
                    <Box>{ state.user && state.user.email ? state.user.email : 'email@test.com'}</Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Divider/>
            <MenuItem className={clsx(classes.logout)} onClick={logout}>
              <Box mr={1} pt={1}><FolderShared/></Box>
              <Box>Cerrar Sesion</Box>
            </MenuItem>
          </Menu>
          <ListItemText className={clsx(classes.title)} primary={state.title} />
        </ListItem>
      </List>
      {/* INFORMACION DEL USUARIO */}
      <section className="user--information">
        <section className="user--information_logo">
          { state.user && state.user.nombres ? state.user.nombres.charAt(0) : 'U'}
        </section>
        <section className="user--information_name">
          { state.user && state.user.nombres ? state.user.nombres : 'Usuario S/N'}
        </section>
        <section className="user--information_email">
          { state.user && state.user.email ? state.user.email : 'Email S/N'}
        </section>
      </section>
      <Divider/>
      <List aria-label="routes" style={{ paddingTop: 1 }}>
        {Array.isArray(Routes) && Routes.length > 0 ? (Routes.map((item, index) => (
          <NavLink
            to={item.url}
            className={clsx(classes.links)}
            key={index}
          >
            <ListItem
              className={clsx({
                [classes.selectItem]: itemSelected === index
              })}
              onClick={() => setItemSelected(index)}
            >
              <ListItemIcon style={{ minWidth: 35 }}>
                <Icon className={clsx(classes.icon)} component={itemSelected === index ? FolderOpen : Folder}/>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
            <Divider/>
          </NavLink>
        ))) : null }
      </List>
    </Fragment>
  );

  return (
    loggedIn && <div className={classes.root}>
      {
        ['xs', 'sm'].includes(width) ? (
          <Drawer
            anchor="left"
            open={isOpen}
            onClose={handleCloseDrawer}
            classes={{
              paper: clsx(classes.appSidenav, classes.appearance, 'app--sidenav')
            }}
          >
            <Options/>
          </Drawer>
        ) : (
          <Drawer
            elevation={0}
            className={clsx({
              [classes.appSidenavOpen]: appSidenavStatus,
              [classes.appSidenavClose]: !appSidenavStatus,
            }, 'app--sidenav')}
            classes={{
              paper: clsx(classes.appSidenav, {
                [classes.appSidenavOpen]: appSidenavStatus,
                [classes.appSidenavClose]: !appSidenavStatus,
              }, classes.appearance)
            }}
            variant="permanent"
          >
            <Options/>
          </Drawer>)
      }
    </div>
  );
};

export default withWidth()(Sidenav);
