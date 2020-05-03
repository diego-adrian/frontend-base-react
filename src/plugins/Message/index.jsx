import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { closeMessage } from '../../redux/pluginsDuck';

const Messages = ({ show, message, theme, timeout, closeMessage }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    open={show}
    autoHideDuration={timeout || 5000}
    onClose={closeMessage}
  >
    <Alert onClose={closeMessage} severity={theme}>{message}</Alert>
  </Snackbar>
);
const mapStateToProps = ({ plugins: { Message: { show, message, theme, timeout } } }) => ({
  show,
  message,
  theme,
  timeout
});

export default connect(mapStateToProps, { closeMessage })(Messages);
