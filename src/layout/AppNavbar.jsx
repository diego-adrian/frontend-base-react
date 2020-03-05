import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setStatusSidenav } from '../redux/layoutDuck';
import '../assets/scss/AppNabvar.scss';


const AppNavbar = ({ widthSidenavOpen, appSidenavStatus, widthSidenavClose, setStatusSidenav }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: 'none',
      background: 'white',
      height: '50px',
      borderBottom: '1px solid rgba(0, 0, 0, .2)'
    },
    appSidenavOpen: {
      width: `calc(100vw - ${widthSidenavOpen}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    appSidenavClose: {
      width: `calc(100vw - ${widthSidenavClose}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      minHeight: '50px'
    },
    boliviaServicio: {
      color: 'rgba(0, 0, 0, 0.75)',
      fontFamily: 'Sansation',
      fontSize: '.9em'
    }
  }));
  const classes = useStyles();
  const statusNavbar = () => {
    setStatusSidenav(!appSidenavStatus);
  };
  return (
    <AppBar position="fixed" className={clsx(classes.root, {
      [classes.appSidenavOpen]: appSidenavStatus,
      [classes.appSidenavClose]: !appSidenavStatus
    })}>
      <Toolbar component="div" className={classes.toolbar}>
        <IconButton aria-label="menu" onClick={statusNavbar}>
          <Menu style={{ color: 'black' }}></Menu>
        </IconButton>
        <Typography className={classes.boliviaServicio}>BOLIVIA A TU SERVICIO</Typography>
        <ul className="redes__sociales">
          <li tooltip="Facebook">&nbsp;</li>
          <li tooltip="Twitter">&nbsp;</li>
          <li tooltip="Youtube">&nbsp;</li>
          <li tooltip="Teléfono de contacto">&nbsp;</li>
          <li tooltip="Correo electrónico">&nbsp;</li>
          <li tooltip="Whatsapp">&nbsp;</li>
          <li tooltip="Messenger">&nbsp;</li>
      </ul >
      </Toolbar>
    </AppBar>
  )
};

const mapStateToProps = ({ layout: { widthSidenavOpen, appSidenavStatus, widthSidenavClose }}) => ({
  widthSidenavOpen,
  widthSidenavClose,
  appSidenavStatus
});

export default connect(mapStateToProps, { setStatusSidenav })(AppNavbar);