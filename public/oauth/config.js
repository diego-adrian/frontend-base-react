var config = {
  backendApi: 'http://localhost:4000',
  domain: 'http://localhost:3000', // subdominio donde está instalado el frontend si está en la raiz se colocar vacio
  appName: 'app' // prefijo para los localstorage del sistema
};

config.urlLogin = config.domain + '/#/login'; // Ruta del login del frontend
config.urlHome = config.domain + '/'; // Ruta del frontend
config.urlAutorizar = config.backendApi + '/authorization'; // Ruta de autorización en el backend

// Array de items de localstorage que no se quieren que se borren cuando se cierre sesión en ciudadanía
// EJEMPLO:
// config.exceptions = [ config.appName + '_ejemplo' ];
config.exceptions = [];
