import React, { useState, Fragment } from 'react';
import { Add, Edit, Delete, GroupAddOutlined } from '@material-ui/icons';
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
  DialogTitle,
  TextField,
  Grid
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MessageError, MessageSuccess, openConfirm } from '../../redux/pluginsDuck';
import Service from '../../plugins/Service';
import Datetime from '../../plugins/datetime';
import CrudTable from '../../plugins/CrudTable';
import { useForm } from '../../plugins/Hooks';

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
  },
  borderBottom: {
    borderBottom: '1px solid rgba(0, 0, 0, .12)',
  }
}));

const DialogCustomized = withStyles(() => ({
  root: {
    '& .MuiDialog-paper': {
      width: 420
    }
  }
}))(Dialog);

const User = () => {
  console.log('User component');
  const classes = useStyles();
  const dispatch = useDispatch();
  const form = useForm({
    user: null,
    nombres: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    email: null
  });
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('add');
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

  const handleOpen = (option) => {
    setAction(option);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = () => {
    form.reset();
    handleOpen('add');
  };

  const createOrUpdate = async (event) => {
    event.preventDefault();
    try {
      if (Object.values(form.errors).includes(true)) {
        dispatch(MessageError('Faltan campos por llenar'));
        form.setTouched();
      } else {
        const data = {
          user: form.values.user,
          nombres: form.values.nombres,
          apellidoPaterno: form.values.apellidoPaterno,
          apellidoMaterno: form.values.apellidoMaterno,
          email: form.values.email
        };
        const userCreated = await Service.post('usuario', data);
        console.log(userCreated);
        if (userCreated && userCreated.finalizado) {
          dispatch(MessageSuccess('Usuario exitosamente guardado'));
          handleClose();
        } else {
          throw new Error(userCreated.mensaje);
        }
      }
    } catch (error) {
      dispatch(MessageError(error.message));
    }
  };

  const deleteItem = (rows) => {
    console.log('Delete rows');
    console.log(rows);
    dispatch(openConfirm('¿Esta seguro de eliminar el registro?', () => {
      console.log(7777777);
    }));
  };
  const editItem = (rows) => {
    console.log('Edit rows');
    console.log(rows);
    const data = {
      user: rows.usuario,
      nombres: rows.persona.nombres,
      apellidoPaterno: rows.persona.primerApellido,
      apellidoMaterno: rows.persona.segundoApellido,
      email: rows.correoElectronico
    };
    form.reset();
    form.setValues(data);
    handleOpen('edit');
  };

  const Buttons = () => (
    <Button
      variant="contained"
      color="secondary"
      onClick={addUser}
      startIcon={<Add />}
    >
      Agregar
    </Button>
  );

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
        <form noValidate onSubmit={createOrUpdate}>
          <DialogTitle className={classes.borderBottom}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyItems="start">
              <GroupAddOutlined color="primary" />
              <Box ml={1} fontSize={15}>
                { action === 'add' ? 'Agregar ' : 'Editar ' }
                usuario
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Grid container spacing={1}>
                <Grid item md={6} xs={12} sm={6} lg={6} xl={6}>
                  <TextField
                    error={form.errors.user && form.touched.user}
                    name="user"
                    value={form.values.user}
                    onChange={form.addValue}
                    helperText={form.errors.user && form.touched.user ? 'El campo no puede estar vacio' : ''}
                    fullWidth
                    margin="dense"
                    autoFocus
                    variant="standard"
                    label="Usuario"
                    color="primary"
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={6} lg={6} xl={6}>
                  <TextField
                    error={form.errors.nombres && form.touched.nombres}
                    name="nombres"
                    value={form.values.nombres}
                    onChange={form.addValue}
                    helperText={form.errors.nombres && form.touched.nombres ? 'El campo no puede estar vacio' : ''}
                    fullWidth
                    margin="dense"
                    variant="standard"
                    label="Nombres"
                    color="primary"
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={6} lg={6} xl={6}>
                  <TextField
                    error={form.errors.apellidoPaterno && form.touched.apellidoPaterno}
                    name="apellidoPaterno"
                    value={form.values.apellidoPaterno}
                    onChange={form.addValue}
                    helperText={form.errors.apellidoPaterno && form.touched.apellidoPaterno ? 'El campo no puede estar vacio' : ''}
                    fullWidth
                    margin="dense"
                    variant="standard"
                    label="Apellido Paterno"
                    color="primary"
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={6} lg={6} xl={6}>
                  <TextField
                    name="apellidoMaterno"
                    onChange={form.addValue}
                    value={form.values.apellidoMaterno}
                    fullWidth
                    margin="dense"
                    variant="standard"
                    label="Apellido Materno"
                    color="primary"
                  />
                </Grid>
                <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                  <TextField
                    error={form.errors.email && form.touched.email}
                    name="email"
                    value={form.values.email}
                    onChange={form.addValue}
                    helperText={form.errors.email && form.touched.email ? 'El campo no puede estar vacio' : ''}
                    fullWidth
                    margin="dense"
                    variant="standard"
                    label="Correo electrónico"
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="default" disableElevation onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="primary" type="submit">
              { action === 'add' ? 'Crear ' : 'Actualizar ' }
              Usuario
            </Button>
          </DialogActions>
        </form>
      </DialogCustomized>
    </Fragment>
  );
};

export default User;
