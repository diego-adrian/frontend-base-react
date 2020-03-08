import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Routes from '../Router/routes';
import { Drawer, List, ListItemText, Divider, Box } from '@material-ui/core';

const Sidebar = ({loggedIn, widthSidenavOpen, widthSidenavClose, appSidenavStatus}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    appSidenav: {
      width: widthSidenavOpen,
      flexShrink: 0,
      whiteSpace: 'nowrap'
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
    }
  }));
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
          })
        }}
        variant="permanent"
      >
        App
        <Divider/>
        <List>
            {Routes.map((item, index) => (
              <NavLink 
                to={item.path}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                key={index}>
                <Box mr={1}>
                  <Icon component={item.icon}></Icon>
                </Box>
                <ListItemText primary={item.name} />
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