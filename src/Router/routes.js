import { Dashboard } from '@material-ui/icons';
import { DashboardPage, Login } from './components';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

export default routes;