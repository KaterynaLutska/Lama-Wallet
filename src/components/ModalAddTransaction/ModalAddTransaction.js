import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectorsAuth, ActionAuth } from '../../redux/auth';

// Radio button
import { withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Icon from '@material-ui/core/Icon';

import CloseIcon from '@material-ui/icons/Close';

import { Operations } from '../../redux/transactions';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AntSwitch = withStyles(theme => ({
  root: {
    width: 80,
    height: 40,
    padding: 0,
    display: 'flex',
    overflow: 'visible',
  },
  switchBase: {
    padding: 0,
    color: `#24CCA7`,
    '&$checked': {
      transform: 'translateX(36px)',
      color: `#FF6596`,
      '& + $track': {
        backgroundColor: theme.palette.common.white,
        borderColor: `1px solid #E0E0E0`,
      },
    },
  },
  thumb: {
    width: 44,
    height: 44,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 30,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function ModalAddTransaction() {
  const classes = useStyles();
  const initialState = {
    category: '',
    time: '',
    amount: '',
    type: false,
    commentary: '',
  };
  const [transaction, setTransaction] = React.useState(initialState);
  const { category, time, amount, type, commentary } = transaction;

  // Switch for State
  const dispatch = useDispatch();

  const isShowModal = useSelector(selectorsAuth.getShowModal);

  const toggleModal = () => {
    dispatch(ActionAuth.showModal(!isShowModal));
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'category':
        setTransaction(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'time':
        setTransaction(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'amount':
        setTransaction(prevState => ({
          ...prevState,
          [name]: Number(value.replace(/[^0-9]/gi, '')),
        }));
        break;
      case 'type':
        setTransaction(prevState => ({
          ...prevState,
          [name]: e.target.checked,
        }));
        break;
      case 'commentary':
        setTransaction(prevState => ({ ...prevState, [name]: value }));
        break;
      default:
    }
  };

  const sort = !type ? 'Доход' : 'Расход';

  const handleSubmit = async e => {
    e.preventDefault();

    await dispatch(
      Operations.addTransaction({
        category,
        time,
        amount,
        sort,
        commentary,
      }),
    );
    reset();
  };

  const cancelInput = () => {
    setTransaction(initialState);
  };

  const reset = () => {
    setTransaction(initialState);
  };

  let activateSubmitBtn = true;
  if (category && time && amount && commentary) {
    activateSubmitBtn = false;
  }

  let classNameProfit = 'grey2';
  if (!type) {
    classNameProfit = 'green';
  }

  let classNameExpencess = 'grey1';
  if (type) {
    classNameExpencess = 'red';
  }

  return (
    <div className="modalContainer">
      <form
        onSubmit={handleSubmit}
        className="addTransactionForm"
        autoComplete="off"
      >
        <h2 className="title">Добавить транзакцию</h2>
        <div className="radioBtn">
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>
                <span className={classNameProfit}>Доход</span>
              </Grid>
              <Grid item>
                <AntSwitch checked={type} onChange={handleChange} name="type" />
              </Grid>
              <Grid item>
                <span className={classNameExpencess}>Расход</span>
              </Grid>
            </Grid>
          </Typography>
        </div>

        {type ? (
          <div className="cetegory">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">
                Выберите категорию
              </InputLabel>
              <Select
                native
                value={category}
                onChange={handleChange}
                inputProps={{
                  name: 'category',
                  id: 'age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={'Еда'}>Еда</option>
                <option value={'Машина'}>Авто</option>
                <option value={'Развитие'}>Развитие</option>
                <option value={'Дети'}>Дети</option>
                <option value={'Дом'}>Дом</option>
                <option value={'Образование'}>Образование</option>
                <option value={'Другое'}>Остальные</option>
              </Select>
            </FormControl>
          </div>
        ) : (
          <div className="cetegory">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">
                Выберите категорию
              </InputLabel>
              <Select
                native
                value={category}
                onChange={handleChange}
                inputProps={{
                  name: 'category',
                  id: 'age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={'Регулярный доход'}>Регулярный доход</option>
                <option value={'Нерегулярный доход'}>Нерегулярный доход</option>
              </Select>
            </FormControl>
          </div>
        )}
        <div className="data-money-form">
          <div action="">
            <TextField
              required
              className="money-input"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Введите сумму"
              autoComplete="off"
              inputProps={{
                maxLength: '8',
              }}
            />
          </div>
          <div>
            <TextField
              className="date-input"
              type="date"
              id="start"
              name="time"
              value={time}
              min="2010-01-01"
              max="2025-12-31"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-comments">
          <div className={classes.root} noValidate autoComplete="off">
            <TextField
              className="input-comments"
              id="standard-basic"
              label="Комментарий"
              name="commentary"
              value={commentary}
              onChange={handleChange}
              inputProps={{
                maxLength: '40',
              }}
            />
          </div>
        </div>

        <div className="modal-form-btn-container">
          <Button
            className="btn-form active"
            type="submit"
            disabled={activateSubmitBtn}
          >
            Добавить
          </Button>

          <Button className="btn-form" onClick={cancelInput}>
            Отменить
          </Button>
        </div>

        <div>
          <button
            type="button"
            className="BtnCloseTransaction"
            onClick={toggleModal}
          >
            <Icon>
              <CloseIcon />
            </Icon>
          </button>
        </div>
      </form>
    </div>
  );
}
