import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Operations, Selectors } from '../../redux/transactions';
import { makeStyles } from '@material-ui/core/styles';

import ButtonAddTransaction from '../ButtonAddTransactions/ButtonAddTransactions';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Alpaca from '../Alpaca/Alpaca';

const columns = [
  { id: 'date', label: 'Дата' },
  { id: 'type', label: 'Тип' },
  {
    id: 'category',
    label: 'Категория',
  },
  {
    id: 'comment',
    label: 'Комментарий',
  },
  {
    id: 'sum',
    label: 'Сумма',
  },
  {
    id: 'balance',
    label: 'Баланс',
  },
];

function createData(id, date, type, category, comment, sum, balance) {
  return { id, date, type, category, comment, sum, balance };
}

const useStyles = makeStyles({
  container: {
    maxWidth: 700,
    maxHeight: 555,
  },
});

export default function StickyHeadTable({ tableData }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteTransaction = id => {
    dispatch(Operations.deleteTransaction(id));
  };
  const isLoading = useSelector(Selectors.getLoading);

  let rows = [];

  tableData.map(t => {
    const time = t.time ? t.time.date.substr(0, 10) : '';
    const sort = t.sort === 'Расход' ? '-' : '+';
    rows.push(
      createData(
        t.id,
        time,
        sort,
        t.category,
        t.commentary || 'Без комментариев',
        t.amount,
        t.balance,
      ),
    );
    return rows;
  });

  return (
    <>
      {!isLoading && tableData.length === 0 ? (
        <Alpaca />
      ) : (
        <>
          {tableData.length !== 0 && (
            <>
              <div key="homeTab" className="homeTab">
                <Paper
                  key="Paper"
                  className={`${classes.root} paper`}
                  style={{
                    backgroundColor: '#11ffee00',
                    borderCollapse: 'collapse',
                    boxShadow: '0px 0px 0px 0px',
                  }}
                >
                  <TableContainer
                    key="container"
                    className={`${classes.container} tableContainer`}
                  >
                    <Table
                      key="table"
                      stickyHeader
                      aria-label="sticky table"
                      className="table"
                      style={{
                        width: 'none',
                      }}
                    >
                      <TableHead key="thead" className="thead">
                        <TableRow key="TableRow" className="tableHeader">
                          {columns.map(column => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className="rowHeader"
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => {
                          return (
                            <>
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                                className={
                                  row.type === '-'
                                    ? 'row expenses'
                                    : 'row income'
                                }
                              >
                                {columns.map(column => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={`${row.id}${column.id}`}
                                      align={column.align}
                                      className={`cellBody ${column.id}`}
                                    >
                                      {typeof value === 'number'
                                        ? new Intl.NumberFormat('ru-RU').format(
                                            value,
                                          )
                                        : value}
                                    </TableCell>
                                  );
                                })}
                                <td className="deleteBtn">
                                  <DeleteForeverIcon
                                    key="deleteIcon"
                                    onClick={() => deleteTransaction(row.id)}
                                    className="deleteIcon"
                                  />
                                </td>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
              {/* Mobile */}

              <table
                key="tableMobile"
                aria-label="sticky table"
                className="tableMobile"
              >
                {rows.map(row => {
                  return (
                    <>
                      <tbody
                        key={row.id}
                        className={
                          row.type === '-'
                            ? 'sectionMobile expensesM'
                            : 'sectionMobile incomeM'
                        }
                      >
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <>
                              <tr className="rowMobile">
                                <th
                                  key={`${row.id}${column.id}mobile`}
                                  align={column.align}
                                  className="cellHeader "
                                >
                                  {column.label}
                                </th>

                                <td
                                  key={`${column.id}tdmobile`}
                                  align={column.align}
                                  className={`cellValue ${column.id}`}
                                >
                                  {typeof value === 'number'
                                    ? new Intl.NumberFormat('ru-RU').format(
                                        value,
                                      )
                                    : value}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <tr>
                          <td className="deleteIconM">
                            <DeleteForeverIcon
                              key="deleteIconM"
                              onClick={() => deleteTransaction(row.id)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </>
          )}
        </>
      )}
      <ButtonAddTransaction />
    </>
  );
}
