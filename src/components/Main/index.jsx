import React from 'react';
/* eslint-disable  react-hooks/rules-of-hooks */
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const admin = ({ widthSidenavOpen, widthSidenavClose, appSidenavStatus }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: 10,
      display: 'flex',
      flexGrow: 1
    },
    normalContent: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: widthSidenavOpen,
    },
    compressContent: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: widthSidenavClose,
    }
  }));
  const classes = useStyles();
  
  return (
    <div className={clsx(classes.root, {
      [classes.normalContent]: appSidenavStatus,
      [classes.compressContent]: !appSidenavStatus,
    })}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
      facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
      gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
      donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
      adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
      Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
      imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
      arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
      donec massa sapien faucibus et molestie ac.
    </div>
  )
};

const mapStateToProps = ({ layout: { widthSidenavOpen, widthSidenavClose, appSidenavStatus}}) => ({
  widthSidenavOpen,
  widthSidenavClose,
  appSidenavStatus
});

export default connect(mapStateToProps)(admin);