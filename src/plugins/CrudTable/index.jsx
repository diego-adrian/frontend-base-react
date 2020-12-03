import React, { useReducer, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow,
  Box,
  TextField,
  IconButton,
  LinearProgress,
  CircularProgress
} from '@material-ui/core';
import { RefreshOutlined, FilterList, CloseSharp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { MessageError } from '../../redux/pluginsDuck';
import Service from '../Service';

const CrudTable = ({ url, headers, buttons, render, filters }) => {
  const SET_DATA = 'SET_DATA';
  const SET_PAGE = 'SET_PAGE';
  const SET_FETCHING = 'SET_FETCHING';
  const SHOW_FILTERS = 'SHOW_FILTERS';
  const SET_SEARCH = 'SET_SEARCH';
  const SET_REFRESH = 'SET_REFRESH';
  const SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE';
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.layout.isOpen);
  const widthSidenavOpen = useSelector(state => state.layout.widthSidenavOpen);
  const widthSidenavClose = useSelector(state => state.layout.widthSidenavClose);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 'calc(100vh - 120px)'
    },
    spacing: {
      padding: 0,
      margin: 0,
      borderBottom: 0
    },
    buttonInfo: {
      color: '#FFF',
      background: theme.palette.info.main,
      '& :hover': {
        background: theme.palette.info.light
      }
    },
    warningProgress: {
      background: theme.palette.warning.light
    },
    textField: {
      marginLeft: 5,
      marginRight: 5
    },
    iconError: {
      color: theme.palette.error.main
    },
    loadingData: {
      position: 'fixed',
      height: 'calc(100vh - 120px)',
      maxHeight: 'calc(100vh - 120px)',
      width: `calc(100vw - ${isOpen ? widthSidenavOpen : widthSidenavClose}px)`,
      zIndex: 3,
      background: 'rgba(255, 255, 255, .8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }));
  const classes = useStyles();
  const initialState = {
    search: {
      field: null,
      value: null
    },
    refresh: 0,
    showFilters: false,
    fetching: false,
    rows: [],
    page: 0,
    total: 10,
    itemsPerPage: 10
  };
  const stateReducer = (state, action) => {
    switch (action.type) {
      case SET_DATA:
        return {
          ...state,
          rows: action.payload.rows,
          total: action.payload.total,
          fetching: action.payload.fetching
        };
      case SET_PAGE:
        return {
          ...state,
          page: action.payload.page,
          fetching: action.payload.fetching
        };
      case SET_ITEMS_PER_PAGE:
        return {
          ...state,
          itemsPerPage: action.payload.itemsPerPage,
          fetching: action.payload.fetching
        };
      case SET_FETCHING:
        return {
          ...state,
          fetching: action.payload
        };
      case SHOW_FILTERS: {
        return {
          ...state,
          showFilters: action.payload
        };
      }
      case SET_SEARCH: {
        return {
          ...state,
          search: {
            field: action.payload.name,
            value: action.payload.value
          }
        };
      }
      case SET_REFRESH: {
        return {
          ...state,
          refresh: Math.floor(Math.random() * 99 + 1),
          page: 0
        };
      }
      default:
        return state;
    }
  };
  const [state, distpachReducer] = useReducer(stateReducer, initialState);

  const getData = async () => {
    let query = {
      limit: state.itemsPerPage,
      page: state.page + 1
    };
    if (state.search.field && state.search.value) {
      query = {
        ...query,
        [state.search.field]: state.search.value
      };
    }
    distpachReducer({
      type: SET_FETCHING,
      payload: true
    });
    const response = await Service.list(url, query);
    if (response && response.finalizado) {
      distpachReducer({
        type: SET_DATA,
        payload: {
          rows: response.datos.rows,
          total: response.datos.count,
          fetching: false
        }
      });
    } else {
      dispatch(MessageError(response.mensaje));
    }
  };

  useEffect(() => {
    getData();
  }, [state.page, state.itemsPerPage, state.search, state.refresh]);

  const handleChangePage = (event, newPage) => {
    distpachReducer({
      type: SET_PAGE,
      payload: {
        page: newPage,
        fetching: false
      }
    });
  };

  const handleInputSearch = ({ target: { name, value } }) => {
    distpachReducer({
      type: SET_SEARCH,
      payload: {
        name,
        value
      }
    });
  };

  const handleFilters = () => {
    const { showFilters } = state;
    distpachReducer({
      type: SHOW_FILTERS,
      payload: !showFilters
    });
  };

  /**
   * @function refresh
   * @description Esta funcion esta encargada de recargar la grilla
   */
  const refresh = () => {
    distpachReducer({
      type: SET_REFRESH
    });
  };

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    distpachReducer({
      type: SET_ITEMS_PER_PAGE,
      payload: {
        itemsPerPage: +value,
        fetching: false
      }
    });
    distpachReducer({
      type: SET_PAGE,
      payload: {
        page: 0,
        fetching: false
      }
    });
  };

  return (
    <Paper className={classes.root}>
      { state.fetching ? <Box>
        <LinearProgress className={classes.warningProgress}/>
        <Box className={classes.loadingData}>
          <CircularProgress color="secondary" style={{ marginBottom: 7 }} size={30}/>
          Cargando datos ...
        </Box>
      </Box> : null }
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={headers.length} className={classes.spacing}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                  { buttons }
                  <IconButton id="btn-refresh" color="secondary" onClick={refresh}>
                    <RefreshOutlined />
                  </IconButton>
                  <IconButton color="secondary" onClick={handleFilters}>
                    { state.showFilters ? <CloseSharp className={classes.iconError}/> : <FilterList /> }
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
            {
              filters && state.showFilters ? <TableRow>
                <TableCell colSpan={headers.length} className={classes.spacing}>
                  <Box display="flex" flexWrap="nowrap" flexGrow={1} flexDirection="row" alignItems="center" justifyItems="center">
                    { filters.map((field, idx) => <TextField autoFocus={idx === 0} name={field.key} onChange={handleInputSearch} margin="dense" key={idx} fullWidth className={classes.textField} label={field.label} />)}
                  </Box>
                </TableCell>
              </TableRow> : null
            }
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  variant="head"
                  key={header.key}
                  align={header.align}
                  sortDirection="asc"
                >
                  <TableSortLabel
                    active={header.sort}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { render({ rows: state.rows })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={state.total}
        rowsPerPage={state.itemsPerPage}
        page={state.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

CrudTable.propTypes = {
  url: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string })).isRequired
};

export default memo(CrudTable);
