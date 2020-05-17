import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
  makeStyles,
  Box
} from '@material-ui/core';
import { InfoRounded, DoneAll } from '@material-ui/icons';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { closeAlert } from '../../redux/pluginsDuck';

const useStyles = makeStyles((theme) => ({
  iconError: {
    color: theme.palette.error.main
  }
}));

const Alert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { show, text, width } = useSelector(state => ({
    show: state.plugins.Alert.show,
    text: state.plugins.Alert.text,
    width: state.plugins.Alert.width
  }), shallowEqual);

  const DialogCustomized = withStyles(() => ({
    root: {
      '& .MuiDialog-paper': {
        width
      }
    }
  }))(Dialog);

  const handleClose = () => dispatch(closeAlert());

  return (
    <DialogCustomized
      disableEscapeKeyDown
      disableBackdropClick
      open={show}
      onClose={handleClose}
    >
      <DialogTitle>
        <Box display="flex" fontSize={15} flexDirection="row" alignItems="center" justifyItems="start">
          <InfoRounded className={classes.iconError} />
          Alerta
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          { text }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<DoneAll/>} onClick={handleClose} variant="contained" color="secondary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </DialogCustomized>
  );
};

export default Alert;
