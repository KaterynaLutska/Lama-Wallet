import axios from 'axios';
import {
  getTransactionsRequest,
  getTransactionsSuccess,
  getTransactionsError,
  addTransactionRequest,
  addTransactionSuccess,
  addTransactionError,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  deleteTransactionError,
  getFilterTransactionsStatisticRequest,
  getFilterTransactionsStatisticSuccess,
  getFilterTransactionsStatisticError,
  getTransactionsStatisticRequest,
  getTransactionsStatisticSuccess,
  getTransactionsStatisticError,
} from './transactions-actions';
import { GetError } from '../../helpers/HandleErrors/HandleErrors';

axios.defaults.baseURL = 'https://costyle-wallet-app.herokuapp.com/';

const getTransaction = () => async dispatch => {
  dispatch(getTransactionsRequest());

  try {
    const { data } = await axios.get('/api/transactions/?limit=30');
    dispatch(getTransactionsSuccess(data.payload));
  } catch (error) {
    dispatch(
      GetError({
        error: error.response.data.code,
        requestedCallback: getTransaction,
      }),
    );
    dispatch(getTransactionsError(error.message));
  }
};

const addTransaction = transaction => async dispatch => {
  dispatch(addTransactionRequest());

  try {
    const { data } = await axios.post('/api/transactions', transaction);
    dispatch(addTransactionSuccess(data.payload));
    dispatch(getTransactionsStatistic());
  } catch (error) {
    dispatch(
      GetError({
        error: error.response.data.code,
        requestedCallback: addTransaction,
        requestData: transaction,
      }),
    );
    dispatch(addTransactionError(error.message));
  }
};

const deleteTransaction = id => async dispatch => {
  dispatch(deleteTransactionRequest());
  try {
    await axios.delete(`/api/transactions/${id}`);
    dispatch(deleteTransactionSuccess(id));
    dispatch(getTransaction());
    dispatch(getTransactionsStatistic());
  } catch (error) {
    dispatch(
      GetError({
        error: error.response.data.code,
        requestedCallback: deleteTransaction,
        requestData: id,
      }),
    );
    dispatch(deleteTransactionError(error.message));
  }
};

const getTransactionsStatistic = () => async dispatch => {
  dispatch(getTransactionsStatisticRequest());

  try {
    const { data } = await axios.get('/api/transactions/statistic');
    dispatch(getTransactionsStatisticSuccess(data.payload));
  } catch (error) {
    dispatch(
      GetError({
        error: error.response.data.code,
        requestedCallback: getTransactionsStatistic,
      }),
    );
    dispatch(getTransactionsStatisticError(error.message));
  }
};

const getFilterTransactionsStatistic = date => async dispatch => {
  dispatch(getFilterTransactionsStatisticRequest());
  const { month, year } = date;

  try {
    const { data } = await axios.get(
      `/api/transactions/statistic?month=${month}&year=${year}`,
    );
    dispatch(getFilterTransactionsStatisticSuccess(data.payload));
  } catch (error) {
    dispatch(
      GetError({
        error: error.response.data.code,
        requestedCallback: getFilterTransactionsStatistic,
        requestData: date,
      }),
    );
    dispatch(getFilterTransactionsStatisticError(error.message));
  }
};

export {
  getTransaction,
  addTransaction,
  deleteTransaction,
  getFilterTransactionsStatistic,
  getTransactionsStatistic,
};
