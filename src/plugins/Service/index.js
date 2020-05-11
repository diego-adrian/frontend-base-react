
import axios from 'axios';
import Util from '../utils';
import Storage from '../Storage';
import store from '../../redux/store';
import { MessageError, MessageInfo } from '../../redux/pluginsDuck';
import { setLogin } from '../../redux/userDuck';
import { setStatusSidenav } from '../../redux/layoutDuck';
import router from '../history';

const authToken = process.env.REACT_APP_AUTH_TOKEN || 'Bearer';
const baseServer = process.env.REACT_APP_BASE_SERVER || '';

// INTERCEPTORS CONFIG
// Add a request interceptor
axios.interceptors.request.use(config => config, error => Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use(response => response, (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      store.dispatch(MessageError(error.response.data.mensaje));
    }
    if (error.response.status === 401) {
      if (router.location.pathname !== '/login') {
        store.dispatch(setLogin(false));
        store.dispatch(setStatusSidenav(false));
        store.dispatch(MessageError('Su sesión ha terminado.'));
        Storage.clean();
        router.push('/login');
      }
    }
    if (error.response.status === 500) {
      const { data } = error.response;
      let message = null;
      if (process.env.REACT_APP_DEBUG_MODE) {
        if (data.mensaje || data.message) {
          message = data.mensaje || data.message;
        } else if (typeof data === 'object') {
          const text = [];
          for (const key in data) {
            text.push(`${key}: ${data[key]}`);
          }
          message = text.join('<br />');
        }
      }
      store.dispatch(MessageInfo(message));
      router.push('/500');
    }
  }
  return Promise.reject(error);
});

const getUrl = (url) => baseServer + url;

const filterResponse = response => response;

const handlingErrors = error => {
  let data;
  if (error.response) {
    data = error.response.data;
  } else if (error.message) {
    if (error.message === 'Network Error') {
      store.dispatch(MessageError('Network Error'));
    } else {
      store.dispatch(MessageError(error.message));
    }
  } else {
    store.dispatch(MessageError('Network Error'));
  }
  return data;
};

const request = (method, url, data) => {
  url = getUrl(url, data);
  if (process.env.REACT_APP_DEBUG_MODE) {
    console.info('Petición con DataService:');
    console.info('URL:', method.toUpperCase(), url);
    if (data) {
      console.info('Params:', data);
    }
  }
  const setting = {
    method,
    url
  };
  if (typeof data === 'object' && Object.keys(data).length) {
    setting.data = data;
  }
  // Set token in headers
  if (Storage.exist('token')) {
    setting.headers = {
      Authorization: `${authToken} ${Storage.get('token')}`
    };
  } else {
    router.push('/login');
  }
  return axios(setting)
    .then(response => filterResponse(response.data))
    .catch(error => handlingErrors(error));
};

/**
 * @author dbarra@agetic.gob.bo
 * @description Objeto para el uso de axios para las perticiones
 */
const Service = {
  options (url) {
    return request('get', `${url}/fields`);
  },
  get (url, id) {
    return request('get', url, id);
  },
  post (url, data) {
    return request('post', url, data);
  },
  put (url, data) {
    return request('put', url, data);
  },
  patch (url, data) {
    return request('patch', url, data);
  },
  delete (url, id) {
    return request('delete', url, id);
  },
  remove (url, id) {
    return this.delete(url, id);
  },
  list(url, query) {
    const conector = url.includes('?') ? '&' : '?';
    const queryFormatted = query ? conector + Util.serialize(query) : '';
    return request('get', url + queryFormatted);
  },

  save (url, data) {
    return request(data.id ? 'put' : 'post', url, data);
  },

  file (url, method, name, type, data = {}, forceDownload = false, responseData = false) {
    try {
      return new Promise(async (resolve) => {
        const response = await axios({
          url,
          data,
          baseURL: baseServer,
          method,
          timeout: 10000,
          withCredentials: false,
          responseType: 'arraybuffer',
          headers: {
            Authorization: `${authToken} ${Storage.get('token')}`
          }
        });

        if (response) throw new Error('Error al tratar de procesar el archivo');
        const file = new window.Blob([response.data], {
          type
        });
        const fileURL = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download',
          `${name || new Date().toLocaleDateString()}.${type.split('/')[1]}`);
        if (forceDownload) {
          document.body.appendChild(link);
          link.click();
          resolve('Archivo exitosamente descargado');
        } else if (responseData) {
          resolve(response.data);
        } else {
          // Confirm('¿Desea descargar el archivo?', () => {
          //   document.body.appendChild(link);
          //   link.click();
          //   resolve('Archivo exitosamente generado');
          // }, () => {
          //   resolve(response.data);
          // }, 'Descargar', 'No descargar', 600);
        }
        URL.revokeObjectURL(fileURL);
      });
    } catch (err) {
      console.error(err.message);
    }
  }
};

export default Service;
