const APP_NAME = process.env.REACT_APP_SITENAME || 'app';
const Storage = {
  setUser: (user) => this.set('user', user),
  getUser () {
    return this.get('user');
  },
  set: (key, value) => {
    window.localStorage.setItem(`${APP_NAME}_${key}`, JSON.stringify(value));
  },
  get: (key) => {
    const data = window.localStorage.getItem(`${APP_NAME}_${key}`);
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  },
  /**
   * @author dbarra.agetic.gob.bo
   * @function clean
   * @description Esta funcion esta encargada de limpiar variables del storage
   */
  clean () {
    this.remove('token');
    this.remove('user');
    this.remove('menu');
    this.remove('sidenav');
    this.remove('roles');
  },
  remove (key) {
    window.localStorage.removeItem(`${APP_NAME}_${key}`);
  },
  destroy (key) {
    this.remove(key);
  },
  exist: (key) => {
    const value = window.localStorage.getItem(`${APP_NAME}_${key}`);
    return typeof value !== 'undefined' && value !== undefined && value !== null && value !== 'null' && value !== '[]';
  },
  removeAll: () => window.localStorage.clear()
};

export default Storage;
