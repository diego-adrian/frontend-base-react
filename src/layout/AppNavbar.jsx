import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import '../assets/scss/AppNabvar.scss';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    background: 'white',
    height: '50px',
    borderBottom: '1px solid rgba(0, 0, 0, .2)'
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

const AppNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar component="div" className={classes.toolbar}>
        <IconButton aria-label="menu">
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

export default AppNavbar;