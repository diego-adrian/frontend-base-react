
const express = require('express');
const AuthService  = require('./auth/authService');
const app = express();

const PORT = process.env.PORT || 4000;

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => res.send('Servidor funcionando correctamente'));
app.get('/authorization', (req, res) => {
  try {
    console.log('------------------------------------');
    console.log(2222222222222222222);
    console.log('------------------------------------');
    const auth = AuthService();
    const response = auth.authorizate();
    console.log('------------EEEEEEE------------------------');
    console.log(response);
    console.log('------------------------------------');
  } catch (error) {
    throw new Error(error.message);
  }
});

app.get('/auth', (req, res) => {
  try {
    const auth = AuthService();
    const response = auth.getCode();
    if (response && response.url) {
      res.json({
        url: response.url
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