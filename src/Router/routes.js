import { Login, Usuarios, Dashboard } from './components';

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
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
];

export default routes;
