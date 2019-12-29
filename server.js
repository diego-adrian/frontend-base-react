
const express = require('express');
const AuthService  = require('./auth/authService');
const auth = AuthService();
const app = express();

const PORT = process.env.PORT || 4000;

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => res.send('Servidor funcionando correctamente'));
app.get('/authorization', async (req, res) => {
  try {
    const response = await auth.authorizate(req);
    if (response.hasOwnProperty('token')) {
      res.json({
        finalizado: true,
        mensaje: '',
        data: response
      });
    } else {
      res.json({
        finalizado: false,
        mensaje: '',
        data: response
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/auth', async (req, res) => {
  try {
    const response = await auth.getCode();
    console.log(response);
    if (response && response.url) {
      res.json({
        finalizado: true,
        mensaje: '',
        datos: {
          url: response.url
        }
      });
    } else {
      throw new Error('Error al tratar de conectarse con ciudadanía digital');
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log('------------------------------------');
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
  console.log('------------------------------------');
});