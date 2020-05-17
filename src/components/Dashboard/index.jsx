import React, { useEffect, Fragment } from 'react';
import { Button, Box, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { InfoOutlined, AddAlertOutlined, WarningOutlined, GridOn, ListAltOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { MessageSuccess, openConfirm, openAlert, openWaiting, closeWaiting } from '../../redux/pluginsDuck';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(MessageSuccess('Bienvenidos al frontend para react'));
  }, []);

  const showWaiting = () => {
    dispatch(openWaiting('Este mensaje desaparecera dentro de 5 seg'));
    setTimeout(() => {
      dispatch(closeWaiting());
    }, 5000);
  };

  return (
    <Fragment>
      <Box mb={1}>
        <Alert severity="info">Métodos Globales</Alert>
      </Box>
      <Box mb={1} display="flex" flexDirection="row" alignItems="center" justifyItems="start">
        <Button startIcon={<InfoOutlined/>} onClick={() => dispatch(openConfirm('Mensaje de prueba para el confirm'))} variant="contained" color="primary">Confirm</Button>
        <Box ml={1}>
          <Button startIcon={<AddAlertOutlined/>} onClick={() => dispatch(openAlert('Mensaje de prueba para el alert'))} variant="outlined" color="secondary">Alert</Button>
        </Box>
        <Box ml={1}>
          <Button startIcon={<WarningOutlined/>} onClick={showWaiting} variant="outlined" color="secondary">Waiting</Button>
        </Box>
      </Box>
      <Box mb={1}>
        <Alert severity="success">Plugins desarrollados</Alert>
        <List component="nav">
          <ListItem>
            <ListItemIcon>
              <GridOn color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Datatables" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAltOutlined color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Hooks personalizados" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAltOutlined color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Service" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAltOutlined color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Mensajes" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAltOutlined color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Storage" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAltOutlined color="primary"/>
            </ListItemIcon>
            <ListItemText primary="etc..." />
          </ListItem>
        </List>
      </Box>
      <Box mb={1}>
        <Alert severity="error">Para mas información, revise el archivo README.md</Alert>
      </Box>
    </Fragment>
  );
};

export default Dashboard;
