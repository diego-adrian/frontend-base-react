import axios from 'axios';
import Storage from '../../plugins/Storage';
import history from '../../plugins/history';
import store from '../../redux/store';
import { setLogin } from '../../redux/userDuck';
import { setStatusSidenav } from '../../redux/layoutDuck';
import { MessageError } from '../../redux/pluginsDuck';

const Auth = {
  getCode: async () => {
    const url = process.env.REACT_APP_BASE_SERVER;
    try {
      const request = {
        method: 'GET',
        url: `${url}public/codigo`,
        responseType: 'json'
      };
      const response = await axios(request);
      window.location.href = new URL(response.data.url);
    } catch (error) {
      store.dispatch(MessageError(error.message));
    }
  },
  logout: () => {
    Storage.clean();
    store.dispatch(setLogin(false));
    store.dispatch(setStatusSidenav(false));
    if (history.location.pathname !== '/login') {
      history.push('/login');
    }
  }
};

export default Auth;
