import React from 'react';
import {
  makeStyles,
  LinearProgress,
  Box
} from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999,
    width: '100%',
    height: '100vh',
    maxHeight: '100vh',
    background: 'rgba(0, 0, 0, .8)',
    color: '#FFF'
  },
  container: {
    width: '100%',
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    position: 'fixed',
    top: '50vh'
  },
  waiting: {
    background: theme.palette.warning.main,
    width: 150,
    marginBottom: 7
  }
}));

const Waiting = () => {
  const classes = useStyles();
  const { show, text } = useSelector(state => ({
    show: state.plugins.Waiting.show,
    text: state.plugins.Waiting.text
  }), shallowEqual);

  return (
    show ? <Box className={classes.box}>
      <Box className={classes.container} display="flex" flexDirection="column" alignItems="center" justifyItems="center">
        <LinearProgress className={classes.waiting}/>
        <section>{text}</section>
      </Box>
    </Box> : null
  );
};

export default Waiting;
