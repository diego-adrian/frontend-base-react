import React, { useState, useEffect } from 'react';
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
  TableRow
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MessageError } from '../../redux/pluginsDuck';
import Service from '../Service';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 'calc(100vh - 120px)'
  },
});

const CrudTable = ({ url, headers }) => {
  console.log('CRUD-TAaaBLE');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getData = async () => {
    const query = {
      limit: itemsPerPage,
      page: page + 1
    };
    const response = await Service.list(url, query);
    if (response && response.finalizado) {
      setRows(response.datos.rows);
      setTotal(response.datos.count);
    } else {
      dispatch(MessageError(response.mensaje));
    }
  };

  useEffect(() => {
    console.log('USEEFFECT-CRUTTABLE');
    getData();
  }, [page, itemsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    setItemsPerPage(+value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
            {rows.map((row, idx) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                {headers.map((header) => {
                  const value = row[header.key];
                  return (
                    <TableCell
                      variant="body"
                      key={header.key}
                      align={header.align}
                    >
                      { 'format' in header ? header.format(value) : value }
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={itemsPerPage}
        page={page}
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

export default CrudTable;
