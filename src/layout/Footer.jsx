import React from 'react';
import { Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    zIndex: 100,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    color: '#FFF',
    textAlign: 'center'
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="div" m={1} className={classNames(classes.root, 'app--footer')}>
      Desarrollado por AGETIC 2020. <Link color="inherit" target="_blank" href="https://agetic.gob.bo/#/">www.agetic.gob.bo</Link>
    </Box>
  )
};

export default Footer;