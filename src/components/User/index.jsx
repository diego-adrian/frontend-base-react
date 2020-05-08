import React from 'react';
import CrudTable from '../../plugins/CrudTable';

const User = () => {
  console.log('User component');
  const url = 'usuario';
  return (
    <div>
      <div>Inside</div>
      <CrudTable
        url={url}
        headers={[]}
      />
    </div>
  );
};

export default User;
