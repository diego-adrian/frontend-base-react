import React, { useState, Fragment } from 'react';
import { Add, Edit, Delete } from '@material-ui/icons';
import {
  Button,
  TableRow,
  TableCell,
  Box,
  IconButton,
  withStyles,
  makeStyles,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import Datetime from '../../plugins/datetime';
import CrudTable from '../../plugins/CrudTable';

const useStyles = makeStyles((theme) => ({
  paddingButton: {
    padding: 7
  },
  success: {
    color: theme.palette.success.main
  },
  delete: {
    color: theme.palette.error.main
  },
  widthModal: {
    display: 'flex',
    flexDirection: 'column',
    width: '600px'
  }
}));

const DialogCustomized = withStyles(() => ({
  root: {
    '& .MuiDialog-paper': {
      width: 550
    }
  }
}))(Dialog);

const User = () => {
  console.log('User component');
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const url = 'usuario';
  const headers = [{
    key: 'actions',
    label: 'Acciones',
    align: 'center',
    sort: false
  }, {
    key: 'usuario',
    label: 'Usuario',
    align: 'center',
    sort: true
  }, {
    key: 'persona',
    label: 'Nombre completo',
    align: 'center',
    sort: false,
    format: (value) => {
      const nombreCompleto = `${value.nombres} ${value.primerApellido} ${value.segundoApellido}`;
      return nombreCompleto;
    }
  }, {
    key: 'correoElectronico',
    label: 'Correo Electronico',
    align: 'center',
    sort: true
  }, {
    key: 'fechaCreacion',
    label: 'Fecha de creación',
    align: 'center',
    sort: true,
    format: (value) => Datetime.format(value, 'dd/MM/YYYY')
  }];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = (rows) => {
    console.log('Delete rows');
    console.log(rows);
  };
  const editItem = (rows) => {
    console.log('Edit rows');
    console.log(rows);
    handleOpen();
  };

  const Buttons = () => {
    console.log('66666');
    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
      >
        Agregar
      </Button>
    );
  };

  return (
    <Fragment>
      <CrudTable
        buttons={<Buttons/>}
        render={({ rows }) => (
          rows.map((row, idx) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
              {headers.map((header) => {
                const value = row[header.key];
                return (
                  <TableCell
                    variant="body"
                    key={header.key}
                    align={header.align}
                  >
                    { header.key === 'actions' ? <Box display="flex" flexDirection="row" alignItems="center" justifyItems="center">
                      <Tooltip placement="bottom" title="Eliminar registro">
                        <IconButton className={classes.paddingButton} onClick={() => deleteItem(row)}>
                          <Delete className={classes.delete} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Editar registro">
                        <IconButton className={classes.paddingButton} onClick={() => editItem(row)}>
                          <Edit className={classes.success} />
                        </IconButton>
                      </Tooltip>
                    </Box> : 'format' in header ? header.format(value) : value }
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        )}
        url={url}
        headers={headers}
      />
      <DialogCustomized
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Agregar</DialogTitle>
        <DialogContent>
          Contenido
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>Enviar</Button>
        </DialogActions>
      </DialogCustomized>
    </Fragment>
  );
};

export default User;
