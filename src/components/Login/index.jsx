import React, { Fragment, useState } from 'react';
import { Container, Grid, Button, Paper, Fade, Zoom, FormControlLabel, Box, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, Switch, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/userDuck';
import { setStatusSidenav } from '../../redux/layoutDuck';
import Footer from '../../layout/Footer';
import Auth from './auth';
import Service from '../../plugins/Service';
import Storage from '../../plugins/Storage';
import { MessageError, MessageWarning, MessageSuccess } from '../../redux/pluginsDuck';
import './Login.scss';

const GridCustomized = withStyles({
  root: {
    '& .input--label': {
      marginTop: '-10px'
    },
    '& .MuiFormLabel-filled, .Mui-focused': {
      marginTop: 0
    },
    '& label.Mui-focused': {
      color: 'white'
    },
    '& label': {
      color: 'white',
      fontSize: 14
    },
    '& .Mui-error': {
      color: 'white',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
      }
    },
    '& .MuiInputBase-root, & .Mui-focused ': {
      '&:before': {
        borderColor: 'white',
      },
      '&:hover:before': {
        borderColor: 'white',
      },
      '& input': {
        color: 'white',
        fontSize: 14
      }
    }
  }
})(Grid);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ciudadaniaDigital: {
    height: 'auto'
  },
  width: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '20vw'
    }
  },
  label: {
    color: '#dbdbdb',
    '& span:last-child': {
      fontSize: '0.8rem'
    }
  },
  changeLogin: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Login = () => {
  console.log('LOGIN');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [formState, setFormState] = useState({
    showPassword: false,
    values: {
      user: null,
      password: null
    },
    errors: {
      user: false,
      password: false
    },
    touched: {
      user: false,
      password: false
    }
  });
  const [state, setState] = useState({
    transition: false
  });
  const loginOpenid = () => {
    Auth.getCode();
  };
  const handleClickShowPassword = () => {
    setFormState((formState) => ({
      ...formState,
      showPassword: !formState.showPassword
    }));
  };
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value || ''
      },
      errors: {
        ...formState.errors,
        [event.target.name]: event.target.value.length === 0
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const loginWithCredentials = async (event) => {
    try {
      event.preventDefault();
      if ((formState.values.user || '').length > 0 && (formState.values.password || '').length > 0) {
        const response = await Service.post('auth', {
          usuario: formState.values.user,
          contrasena: formState.values.password
        });
        if (!response) throw new Error('Existen problemas de conexión. Por favor revise su configuración a Internet.');
        if (!response.error) {
          Storage.set('user', response.usuario);
          Storage.set('roles', response.roles);
          Storage.set('token', response.token);
          Storage.set('menu', [{ url: 'dashboard', label: 'Dashboard' }].concat(response.menu));
          Storage.set('sidenav', true);
          dispatch(MessageSuccess('Acceso exitosamente correcto'));
          dispatch(setLogin(true));
          dispatch(setStatusSidenav(true));
          if (history.location.pathname !== '/dashboard') {
            history.push('/dashboard');
          }
        } else {
          throw new Error(response.error);
        }
      } else {
        setFormState((formState) => ({
          ...formState,
          errors: {
            user: !(formState.values.user || '').length > 0,
            password: !(formState.values.password || '').length > 0
          },
          touched: {
            user: true,
            password: true
          }
        }));
        dispatch(MessageWarning('Faltan campos por llenar'));
      }
    } catch (error) {
      dispatch(MessageError(error.message));
    }
  };
  const handleChangeView = () => {
    setState((state) => ({
      ...state,
      transition: !state.transition
    }));
    setFormState((formState) => ({
      ...formState,
      showPassword: false,
      values: {
        user: null,
        password: null
      },
      errors: {
        user: false,
        password: false
      },
      touched: {
        user: false,
        password: false
      }
    }));
  };

  return (
    <Fragment>
      <div className="app-login">
        <div className="app-login__background"/>
        <Container className={clsx(!state.transition ? 'app-login__container' : 'app-login__credentials', classes.width)}>
          {
            !state.transition ? (
              <Fade in={!state.transition}>
                <Grid container className={classes.root} spacing={0}>
                  <Grid item container direction="column" className={classes.ciudadaniaDigital} md={12} lg={12} xs={12}>
                    <Paper style={{ boxShadow: 'none' }} className="app-login__ciudadaniaDigital"/>
                    <Button color="primary" onClick={loginOpenid} className="app-login__boton">Ingresar con ciudadanía Digital</Button>
                  </Grid>
                  <Grid item container direction="column" className={classes.changeLogin} md={12} lg={12} xs={12}>
                    <FormControlLabel
                      className={clsx(classes.label, 'fs9')}
                      control={<Switch color="primary" checked={state.transition} onChange={handleChangeView} name="change"/>}
                      label="Ingresar con credenciales"
                    />
                  </Grid>
                </Grid>
              </Fade>
            ) : (
              <Zoom in={state.transition}>
                <form noValidate autoComplete="off">
                  <GridCustomized container spacing={0}>
                    <Grid item container className="app-login__titleCredentials" direction="column" md={12} xs={12} sm={12} xl={12} alignItems="center">
                      Iniciar Sesion
                    </Grid>
                    <GridCustomized item container direction="column" md={12} xs={12} sm={12} xl={12}>
                      <Box mb={1}>
                        <TextField
                          fullWidth
                          error={formState.errors.user}
                          label="Usuario"
                          name="user"
                          color="primary"
                          autoFocus
                          onChange={handleChange}
                          placeholder="Por favor digite su usuario"
                          type="text"
                          variant="outlined"
                          margin="dense"
                          helperText={formState.errors.user ? 'El campo del usuario no puede estar vacio' : ''}
                        />
                      </Box>
                    </GridCustomized>
                    <GridCustomized item container direction="column" md={12} xs={12} sm={12} xl={12}>

                      <FormControl variant="outlined">
                        <InputLabel className="input--label">Contraseña</InputLabel>
                        <OutlinedInput
                          type={formState.showPassword ? 'text' : 'password'}
                          value={formState.values.password || ''}
                          onChange={handleChange}
                          fullWidth
                          name="password"
                          color="primary"
                          error={formState.errors.password}
                          margin="dense"
                          placeholder="Por favor digite su contraseña"
                          helpertext={formState.errors.password ? 'El campo de la contraseña no puede estar vacio' : ''}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="mostrar contraseña"
                                onClick={handleClickShowPassword}
                                edge="end"
                                style={{ color: 'white' }}
                              >
                                {formState.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>
                    </GridCustomized>
                    <Grid item container md={12} xs={12} sm={12} xl={12}>
                      <Button color="primary" type="submit" onClick={(e) => loginWithCredentials(e)} className="app-login__boton">Ingresar al Sistema</Button>
                    </Grid>
                    <Grid item container md={12} xs={12} sm={12} xl={12}>
                      <Button color="primary" onClick={handleChangeView} className="app-login__boton--txt fs9">Regresar al login principal</Button>
                    </Grid>
                  </GridCustomized>
                </form>
              </Zoom>
            )
          }
        </Container>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default Login;
