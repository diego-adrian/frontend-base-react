import React from 'react';
import Datetime from '../../plugins/datetime';
import CrudTable from '../../plugins/CrudTable';

const User = () => {
  console.log('User component');
  const url = 'usuario';
  const headers = [{
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
  return (
    <CrudTable
      url={url}
      headers={headers}
    />
  );
};

export default User;
