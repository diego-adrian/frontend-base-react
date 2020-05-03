
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Auth from '../../components/Login/auth';
import Util from '../Util';
const router = useHistory();

const apiUrl = process.env.REACT_APP_API_URL || '';
const authToken = process.env.REACT_APP_AUTH_TOKEN || 'Bearer';
const baseServer = process.env.REACT_APP_BASE_SERVER || '';
const protocol = window.location.protocol.replace(':', '');
const PATERN_HOST = protocol === 'https' ? /(https:\/\/|www\.)\S+/i : /(http:\/\/|www\.)\S+/i;

const configuration = {
  // Plugins
  const Progress = instance.$progress;
  const Message = instance.$message;
  const Storage = instance.$storage;
  const Confirm = instance.$confirm;
  
  const getUrl = (url, id) => {
    id = (typeof id === 'string' || typeof id === 'number') ? `${id}` : '';
    if (url && url[url.length - 1] !== '/' && id.length > 1) {
      id = `/${id}`;
    }
    return PATERN_HOST.test(url) ? (url + id) : baseServer + url + id;
  };
  
  const filterResponse = (response) => {
    Progress.close();
    return response;
  };
  
  const _http = (method, url, data) => {
    Progress.start();
    url = getUrl(url, data);
    if (process.env.VUE_APP_DEBUG_MODE) {
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

export default {
  

    const Services = {
      options (url) {
        return _http('get', `${url}/fields`);
      },

      get (url, id) {
        return _http('get', url, id);
      },

      post (url, data) {
        return _http('post', url, data);
      },

      put (url, data) {
        return _http('put', url, data);
      },

      patch (url, data) {
        return _http('patch', url, data);
      },

      delete (url, id) {
        return _http('delete', url, id);
      },

      remove (url, id) {
        return this.delete(url, id);
      },

      list(url, query) {
        const conector = url.includes('?') ? '&' : '?';
        query = query ? conector + Util.serialize(query) : '';
        return _http('get', url + query);
      },

      save (url, data) {
        return _http(data.id ? 'put' : 'post', url, data);
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
              Confirm('¿Desea descargar el archivo?', () => {
                document.body.appendChild(link);
                link.click();
                resolve('Archivo exitosamente generado');
              }, () => {
                resolve(response.data);
              }, 'Descargar', 'No descargar', 600);
            }
            URL.revokeObjectURL(fileURL);
          });
        } catch (err) {
          Message.error(err.message);
        }
      },

      pdf (url, data = {}) {
        url = getUrl(url, data);
        return axios.post(url, data, {
          responseType: 'arraybuffer'
        })
          .then((response) => {
            if (response.data) {
              const file = new window.Blob([response.data], {
                type: 'application/pdf'
              });
              const fileURL = window.URL.createObjectURL(file);
              return fileURL;
            }
            return null;
          }).catch(error => handlingErrors(error));
      },
      excel (url, data = {}) {
        url = getUrl(url, data);
        return axios.post(url, data, {
          responseType: 'blob',
          headers: {
            Authorization: `${authToken} ${Storage.get('token')}`
          }
        })
          .then((response) => {
            if (response.data) {
              // const file = new window.Blob([response.data.datos], {
              //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              // });
              const fileURL = window.URL.createObjectURL(response.data);
              return fileURL;
            }
            return null;
          }).catch(error => handlingErrors(error));
      }
    };

    const handlingErrors = (error) => {
      Progress.close();
      if (error.response) {
        const { data } = error.response;
        return data;
      } else if (error.message) {
        if (error.message === 'Network Error') {
          Message.error('Network Error');
        } else {
          Message.error(error.message);
        }
      } else {
        Message.error('Network Error');
      }
    };

    // INTERCEPTORS CONFIG
    // Add a request interceptor
    axios.interceptors.request.use(config => config, error => Promise.reject(error));

    // Add a response interceptor
    axios.interceptors.response.use(response => response, (error) => {
      if (error.response) {
        if (error.response.status === 400) {
          const message = error.response.data.mensaje;
          Message.error(message);
        }
        if (error.response.status === 401) {
          if (window.location.hash !== '#/login') {
            Message.error('Su sesión ha terminado.');
            store.commit('setAuth', false);
            instance.logout(router, store);
          }
        }
        if (error.response.status === 402) {
          const message = error.response.data.mensaje;
          Message.error(message);
        }
        if (error.response.status === 403) {
          store.commit('setState403', true);
          router.push('/404');
        }
        if (error.response.status === 500) {
          const { data } = error.response;
          let message = null;
          if (process.env.VUE_APP_DEBUG_MODE) {
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
          store.state.message = message;
          router.push('/500');
        }
      }
      return Promise.reject(error);
    });

    Vue.prototype.$service = Services;
    Vue.prototype.$http = axios;
    Vue.prototype.$apiUrl = apiUrl;
    Vue.prototype.$authToken = authToken;
    Vue.prototype.$baseServer = baseServer;
  }
};
