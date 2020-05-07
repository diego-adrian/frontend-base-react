import { Login, Usuarios } from './components';

const routes = [
  {
    path: '/usuarios',
    name: 'usuarios',
    component: Usuarios
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

export default routes;
