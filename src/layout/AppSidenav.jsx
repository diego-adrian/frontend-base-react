import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { 
  Drawer,
  List,
  Icon,
  ListItem,
  ListItemIcon,
  Grid,
  ListItemText,
  Divider,
  Button,
  CardContent,
  MenuItem,
  Menu,
  CardMedia,
  Box,
  Card
} from '@material-ui/core';
import { AssignmentInd, FolderShared } from '@material-ui/icons';
import Routes from '../Router/routes';
import Storage from '../plugins/Storage';
import Logo from '../assets/images/geometric.png';

const Sidebar = ({loggedIn, widthSidenavOpen, widthSidenavClose, appSidenavStatus}) => {
  const [itemSelected, setItemSelected] = useState(0);
  const [state, setState] = useState({
    popupUserInfo: null,
    user: Storage.getUser()
  });
  const useStyles = makeStyles(theme => ({
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
      },
      
    },
    selectItem: {
      backgroundColor: theme.palette.info.main,
      '& svg': {
        color: theme.palette.primary.dark,
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
      color: '#FFF'
    },
    media: {
      padding: 0,
      margin: 0,
      height: 0,
      paddingTop: 250,
      borderTop: '3px solid #FFF',
      backgroundColor: theme.palette.info.light
    },
    logout: {
      color: theme.palette.error.main,
      fontWeight: 400
    },
    icon: {
      color: theme.palette.info.light,
      opacity: .3
    }
  }));

  const handleUserInfo = (event) => {
    setState(state => ({
      ...state,
      popupUserInfo: event.currentTarget
    }))
  };

  const handleCloseUserInfo = () => {
    setState(state => ({
      ...state,
      popupUserInfo: null
    }))
  };

  const classes = useStyles();

  return (
    loggedIn && <div className={classes.root}>
      <Drawer
        elevation={0}
        className={clsx({
          [classes.appSidenavOpen]: appSidenavStatus,
          [classes.appSidenavClose]: !appSidenavStatus,
        })}
        classes={{
          paper: clsx(classes.appSidenav, {
            [classes.appSidenavOpen]: appSidenavStatus,
            [classes.appSidenavClose]: !appSidenavStatus,
          }, classes.appearance)
        }}
        variant="permanent"
      >
        <List aria-label="header" className={classes.header}>
          <ListItem style={{ paddingLeft: 10, paddingRight: 10}}>
            <Button 
              className={classes.btnUserInfo}
              aria-controls="user-info" 
              aria-haspopup="true"
              onClick={handleUserInfo}>
              F
            </Button>
            <Menu
              id="user-info"
              anchorEl={state.popupUserInfo}
              keepMounted
              open={Boolean(state.popupUserInfo)}
              onClose={handleCloseUserInfo}
              PaperProps={{
                style: {
                  width: 300
                }
              }}
            >
              <Card elevation={0} className={classes.card}>
                <CardContent style={{ padding: 8}}>
                  <Grid container>
                    <Grid item xs={3} sm={3} md={3} xl={3}>
                      <Box textAlign="center">
                        <AssignmentInd className={classes.btnUserInfoCard}/>
                      </Box>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} xl={9}>
                      <Box>
                        { state.user ? `${state.user.nombres} ${state.user.primer_apellido} ${state.user.segundo_apellido}` : '' }
                      </Box>
                      <Box>{ state.user ? state.user.email : ''}</Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Divider/>
              <MenuItem className={clsx(classes.logout)}  onClick={handleCloseUserInfo}>
                <Box mr={1} pt={1}><FolderShared/></Box>
                <Box>Cerrar Sesion</Box>
              </MenuItem>
            </Menu>
            <ListItemText className={clsx(classes.title)} primary={'FRONTEND BASE'} />
          </ListItem>
        </List>
        <CardMedia
          className={classes.media}
          image={Logo}
          title="Logo de la Aplicacion"
        />
        <Divider/>
        <List aria-label="routes" style={{ paddingTop: 1 }}>
          {Routes.map((item, index) => (
            <NavLink 
              to={item.path}
              className={clsx(classes.links)}
              key={index}>
              <ListItem
                className={clsx({
                  [classes.selectItem]: itemSelected === index
                })}
                onClick={() => setItemSelected(index)}
              >
                <ListItemIcon style={{ minWidth: 35}}>
                  <Icon className={clsx(classes.icon)} component={item.icon}></Icon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
              <Divider/>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </div>
  )
};

const mapStateToProps = ({ user: { loggedIn }, layout: { widthSidenavOpen, appSidenavStatus, widthSidenavClose }}) => ({
  loggedIn,
  widthSidenavOpen,
  appSidenavStatus,
  widthSidenavClose
});

export default connect(mapStateToProps)(Sidebar);