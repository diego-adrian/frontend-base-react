import React from 'react';
import { Add } from '@material-ui/icons';
import { Button, TableRow, TableCell, Box } from '@material-ui/core';
import Datetime from '../../plugins/datetime';
import CrudTable from '../../plugins/CrudTable';

const User = () => {
  console.log('User component');
  const url = 'usuario';
  const headers = [{
    key: 'actions',
    label: 'Acciones',
    align: 'left',
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
    <CrudTable
      buttons={<Buttons/>}
      render={({ rows }) => {
        console.log(rows);
        return rows.map((row, idx) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
            {headers.map((header) => {
              const value = row[header.key];
              return (
                <TableCell
                  variant="body"
                  key={header.key}
                  align={header.align}
                >
                  { header.key === 'actions' ? <Box>Actions</Box> : 'format' in header ? header.format(value) : value }
                </TableCell>
              );
            })}
          </TableRow>
        ));
      }}
      url={url}
      headers={headers}
    />
  );
};

export default User;
