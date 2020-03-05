import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Inbox } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';


const Sidebar = ({widthSidenavOpen, widthSidenavClose, appSidenavStatus}) => {
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
    <div className={classes.root}>
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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Inbox />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
};

const mapStateToProps = ({layout: { widthSidenavOpen, appSidenavStatus, widthSidenavClose }}) => ({
  widthSidenavOpen,
  appSidenavStatus,
  widthSidenavClose
});

export default connect(mapStateToProps)(Sidebar);