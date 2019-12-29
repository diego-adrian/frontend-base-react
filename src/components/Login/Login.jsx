import React, { Fragment } from 'react';
import { Container, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../layout/Footer';
import Auth from './auth';
import './Login.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  ciudadaniaDigital: {
    height: '50vh'
  }
}));

const Login = () => {
  const classes = useStyles();

  const loginOpenid = () => {
    console.log(Auth);
    Auth.getCode();
  };

  return (
    <Fragment>
      <div className="app-login">
        <div className="app-login__background"></div>
        <Container className="app-login__container" style={{ background: 'transparent'}}>
          <Grid container className={classes.root} spacing={0}>
            <Grid item container direction="column" className={classes.ciudadaniaDigital} md={12} lg={12} xs={12}>
              <Paper style={{ boxShadow: 'none'}} className="app-login__ciudadaniaDigital"></Paper>
              <Button color="primary" onClick={loginOpenid} className="app-login__boton">Ingresar con ciudadanía Digital</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer/>
    </Fragment>
  )
};

export default Login;