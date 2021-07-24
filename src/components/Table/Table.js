import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Operations } from '../../redux/transactions';

const month = [
  {
    value: 'All',
    month: 'All Period',
  },
  {
    value: '01',
    month: 'Январь',
  },
  {
    value: '02',
    month: 'Февраль',
  },
  {
    value: '03',
    month: 'Март',
  },
  {
    value: '04',
    month: 'Апрель',
  },
  {
    value: '05',
    month: 'Май',
  },
  {
    value: '06',
    month: 'Июнь',
  },
  {
    value: '07',
    month: 'Июль',
  },
  {
    value: '08',
    month: 'Август',
  },
  {
    value: '09',
    month: 'Сентябрь',
  },
  {
    value: '10',
    month: 'Октябрь',
  },
  {
    value: '11',
    month: 'Ноябрь',
  },
  {
    value: '12',
    month: 'Декабрь',
  },
];

function MyTable({ tableData }) {
  const { categoriesSummary, incomeValue, consumptionValue } = tableData;
  const result = Object.entries(categoriesSummary);

  const dispatch = useDispatch();
  const [selected, setSelected] = useState({ month: '', year: '' });

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'month':
        setSelected(prevState => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case 'year':
        setSelected(prevState => ({ ...prevState, [name]: value }));
        break;

      default:
    }
  };

  const reset = () => {
    setSelected(prevState => ({ ...prevState, month: '', year: '' }));
  };

  useEffect(() => {
    if (selected.month === 'All' && selected.year === 'All') {
      dispatch(Operations.getTransactionsStatistic());

      reset();
      return;
    }
    if (selected.month && selected.year) {
      dispatch(
        Operations.getFilterTransactionsStatistic({
          month: Number(selected.month),
          year: Number(selected.year),
        }),
      );

      reset();
    }
  }, [selected]);

  return (
    <div>
      <div className="tableFormStatistic">
        <FormControl variant="outlined" className="formControl">
          <Select
            value={selected.month}
            name="month"
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem value={selected.month}>
              <em className="formControlEm">Месяц</em>
            </MenuItem>

            {month.map(el => {
              return <MenuItem value={el.value}>{el.month}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className="formControl">
          <Select
            value={selected.year}
            name="year"
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem value={selected.year}>
              <em className="formControlEm">Год</em>
            </MenuItem>
            <MenuItem value="All">All Period</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </Select>
        </FormControl>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" className="tableHeadCell">
                Категория
              </TableCell>
              <TableCell align="center" className="tableHeadCell">
                Сумма
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {result.map(row => (
              <TableRow key={row[0]} className="tableColorRow">
                <TableCell>
                  <div className="tableColorSpan">
                    <span
                      className="tableOption"
                      style={{ backgroundColor: row[1].color }}
                    ></span>

                    {row[0]}
                  </div>
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat('ru-RU').format(row[1].value)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="hiddenBorder">
              <TableCell align="left" className="tableValue ">
                Расходы:
              </TableCell>
              <TableCell align="right" className="tableConsumptionValue">
                {new Intl.NumberFormat('ru-RU').format(consumptionValue)}
              </TableCell>
            </TableRow>

            <TableRow className="hiddenBorder">
              <TableCell align="left" className="tableValue">
                Доходы:
              </TableCell>
              <TableCell align="right" className="tableIncomeValue">
                {new Intl.NumberFormat('ru-RU').format(incomeValue)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyTable;
