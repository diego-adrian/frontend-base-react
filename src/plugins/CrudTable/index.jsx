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
  IconButton
} from '@material-ui/core';
import { RefreshOutlined, SearchOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { MessageError } from '../../redux/pluginsDuck';
import Service from '../Service';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 'calc(100vh - 120px)'
  },
  buttonInfo: {
    color: '#FFF',
    background: theme.palette.info.main,
    '& :hover': {
      background: theme.palette.info.light
    }
  }
}));

const CrudTable = ({ url, headers, buttons, render }) => {
  console.log('COMPONENT CRUD-TAaaBLE');
  const SET_DATA = 'SET_DATA';
  const SET_PAGE = 'SET_PAGE';
  const SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE';
  const dispatch = useDispatch();
  const classes = useStyles();
  const initialState = {
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
          total: action.payload.total
        };
      case SET_PAGE:
        return {
          ...state,
          page: action.payload.page
        };
      case SET_ITEMS_PER_PAGE:
        return {
          ...state,
          itemsPerPage: action.payload.itemsPerPage
        };
      default:
        return state;
    }
  };
  const [state, distpachReducer] = useReducer(stateReducer, initialState);

  const getData = async () => {
    const query = {
      limit: state.itemsPerPage,
      page: state.page + 1
    };
    const response = await Service.list(url, query);
    if (response && response.finalizado) {
      distpachReducer({
        type: SET_DATA,
        payload: {
          rows: response.datos.rows,
          total: response.datos.count
        }
      });
    } else {
      dispatch(MessageError(response.mensaje));
    }
  };

  useEffect(() => {
    console.log('USEEFFECT-CRUTTABLE');
    getData();
  }, [state.page, state.itemsPerPage]);

  const handleChangePage = (event, newPage) => {
    distpachReducer({
      type: SET_PAGE,
      payload: {
        page: newPage
      }
    });
  };
  /**
   * @function refresh
   * @description Esta funcion esta encargada de recargar la grilla
   */
  const refresh = () => {
    console.log(8888888);
  };

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    distpachReducer({
      type: SET_ITEMS_PER_PAGE,
      payload: {
        itemsPerPage: +value
      }
    });
    distpachReducer({
      type: SET_PAGE,
      payload: {
        page: 0
      }
    });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={headers.length}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                  { buttons }
                  <IconButton color="secondary" onClick={refresh}>
                    <RefreshOutlined />
                  </IconButton>
                  <IconButton color="secondary">
                    <SearchOutlined />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
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
