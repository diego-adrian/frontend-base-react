import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage } from '../../redux/pluginsDuck';

// https://thoughtbot.com/blog/using-redux-with-react-hooks

const Messages = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.plugins.Message.show);
  const message = useSelector(state => state.plugins.Message.message);
  const theme = useSelector(state => state.plugins.Message.theme);
  const timeout = useSelector(state => state.plugins.Message.timeout);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={show}
      autoHideDuration={timeout || 5000}
      onClose={() => dispatch(closeMessage())}
    >
      <Alert onClose={() => dispatch(closeMessage())} severity={theme}>{message}</Alert>
    </Snackbar>
  );
};

export default Messages;
