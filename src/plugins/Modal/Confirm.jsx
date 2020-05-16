import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { closeConfirm } from '../../redux/pluginsDuck';


const Confirm = () => {
  const dispatch = useDispatch();
  const { show, text, width, textOk, textCancel, callbackOk, callbackCancel } = useSelector(state => ({
    show: state.plugins.Confirm.show,
    text: state.plugins.Confirm.text,
    width: state.plugins.Confirm.width,
    textOk: state.plugins.Confirm.textOk,
    textCancel: state.plugins.Confirm.textCancel,
    callbackOk: state.plugins.Confirm.callbackOk,
    callbackCancel: state.plugins.Confirm.callbackCancel
  }), shallowEqual);

  const DialogCustomized = withStyles(() => ({
    root: {
      '& .MuiDialog-paper': {
        width
      }
    }
  }))(Dialog);

  const handleClose = () => dispatch(closeConfirm());

  const handleCancel = () => {
    dispatch(closeConfirm());
    if (callbackCancel) callbackCancel();
  };

  const handleAccept = () => {
    dispatch(closeConfirm());
    if (callbackOk) callbackOk();
  };

  return (
    <DialogCustomized
      open={show}
      onClose={handleClose}
    >
      <DialogTitle>Confirmar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { text }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          { textCancel }
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          { textOk }
        </Button>
      </DialogActions>
    </DialogCustomized>
  );
};

export default Confirm;
