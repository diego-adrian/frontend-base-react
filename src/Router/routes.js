import { Dashboard, SupervisedUserCircleRounded } from '@material-ui/icons';
import { DashboardPage, Login, User } from './components';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/user',
    name: 'User',
    icon: SupervisedUserCircleRounded,
    component: User
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

export default routes;