import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, ListItem, ListItemIcon } from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { 
  Drawer,
  List,
  ListItemText,
  Divider,
  Button,
  MenuItem,
  Menu,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  CardActions
} from '@material-ui/core';
import Routes from '../Router/routes';
import '../assets/scss/AppSidenav.scss';

const Sidebar = ({loggedIn, widthSidenavOpen, widthSidenavClose, appSidenavStatus}) => {
  const [itemSelected, setItemSelected] = useState(0);
  const [state, setState] = useState({
    popupUserInfo: null
  });
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    appSidenav: {
      width: widthSidenavOpen,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    appSidenavOpen: {
      width: widthSidenavOpen,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    appSidenavClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: widthSidenavClose,
      '&:hover': {
        width: widthSidenavOpen
      }
    },
    appearance: {
      backgroundColor: theme.palette.primary.dark,
      fontFamily: 'Titillium Web'
    },
    links: {
      textDecoration: 'none',
      '& span': {
        color: '#FFF',
        fontSize: '14px'
      }
    },
    btnUserInfo: {
      background: theme.palette.info.main,
      borderRadius: '50%',
      padding: 0,
      margin: 0,
      marginRight: 10,
      width: 40,
      minWidth: 40,
      height: 40,
      minHeight: 40,
      color: '#FFF',
      '&:hover': {
        background: theme.palette.info.main,
      }
    },
    header: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.5)'
    },
    icons: {
      color: '#FFF',
      '& path': {
        fill: '#FFF'
      }
    }
  }));

  const handleUserInfo = (event) => {
    setState(state => ({
      ...state,
      popupUserInfo: event.currentTarget
    }))
  };

  const handleCloseUserInfo = () => {
    setState(state => ({
      ...state,
      popupUserInfo: null
    }))
  };

  const classes = useStyles();

  return (
    loggedIn && <div className={classes.root}>
      <Drawer
        elevation={0}
        className={clsx({
          [classes.appSidenavOpen]: appSidenavStatus,
          [classes.appSidenavClose]: !appSidenavStatus,
        })}
        classes={{
          paper: clsx(classes.appSidenav, {
            [classes.appSidenavOpen]: appSidenavStatus,
            [classes.appSidenavClose]: !appSidenavStatus,
          }, classes.appearance)
        }}
        variant="permanent"
      >
        <List aria-label="header" className={classes.header}>
          <ListItem>
            <Button 
              className={classes.btnUserInfo}
              aria-controls="user-info" 
              aria-haspopup="true" 
              onClick={handleUserInfo}>
              A
            </Button>
            <Menu
              id="user-info"
              anchorEl={state.popupUserInfo}
              keepMounted
              open={Boolean(state.popupUserInfo)}
              onClose={handleCloseUserInfo}
              PaperProps={{
                style: {
                  width: 350
                }
              }}
            >
              <MenuItem onClick={handleCloseUserInfo}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </MenuItem>
              <MenuItem onClick={handleCloseUserInfo}>Logout</MenuItem>
            </Menu>
            <ListItemText className={clsx(classes.links)} primary={'FRONTEND BASE'} />
          </ListItem>
        </List>
        <Divider/>
        <List aria-label="rutas">
            {Routes.map((item, index) => (
              <NavLink 
                to={item.path}
                className={classes.links}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                key={index}>
                <ListItem
                  selected={itemSelected === index}
                  onClick={() => setItemSelected(index)}
                >
                  <ListItemIcon>
                    <Icon className={clsx(classes.icon, 'adrian')} component={item.icon}></Icon>
                  </ListItemIcon>
                  <ListItemText className={clsx(classes.links)} primary={item.name} />
                </ListItem>
                <Divider/>
              </NavLink>
            ))}
        </List>
      </Drawer>
    </div>
  )
};

const mapStateToProps = ({ user: { loggedIn }, layout: { widthSidenavOpen, appSidenavStatus, widthSidenavClose }}) => ({
  loggedIn,
  widthSidenavOpen,
  appSidenavStatus,
  widthSidenavClose
});

export default connect(mapStateToProps)(Sidebar);