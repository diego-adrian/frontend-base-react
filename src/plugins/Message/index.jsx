import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
const Message = ({ message }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(true);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    ></Snackbar>
  )
};

export default Message;