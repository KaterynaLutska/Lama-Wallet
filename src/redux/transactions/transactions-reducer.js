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

import {
  userLogoutSuccess,
  getUpdatedTokenSuccess,
} from '../auth/auth-actions';

import { createReducer } from '@reduxjs/toolkit';

const initialState = [];
const initialStatistic = {
  categoriesSummary: 0,
  incomeValue: 0,
  consumptionValue: 0,
};

const itemsReducers = createReducer(initialState, {
  [getTransactionsSuccess]: (_, { payload }) => payload.transactions,
  [addTransactionSuccess]: (state, { payload }) => [
    payload.transaction,
    ...state,
  ],
  [deleteTransactionSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [userLogoutSuccess]: (_, __) => initialState,
});

const itemsReducersStatistic = createReducer(initialStatistic, {
  [getTransactionsStatisticSuccess]: (_, { payload }) => payload,
  [getFilterTransactionsStatisticSuccess]: (_, { payload }) => payload,
  [userLogoutSuccess]: (_, __) => initialStatistic,
});

const loading = createReducer(false, {
  [getTransactionsRequest]: () => true,
  [getTransactionsSuccess]: () => false,
  [getTransactionsError]: () => false,
  [addTransactionRequest]: () => true,
  [addTransactionSuccess]: () => false,
  [addTransactionError]: () => false,
  [deleteTransactionRequest]: () => true,
  [deleteTransactionSuccess]: () => false,
  [deleteTransactionError]: () => false,
  [getFilterTransactionsStatisticRequest]: () => true,
  [getFilterTransactionsStatisticSuccess]: () => false,
  [getFilterTransactionsStatisticError]: () => false,
  [getTransactionsStatisticRequest]: () => true,
  [getTransactionsStatisticSuccess]: () => false,
  [getTransactionsStatisticError]: () => false,
});

const setError = (_, { payload }) => payload;

const errorTransactionsReducers = createReducer(null, {
  [getTransactionsStatisticError]: setError,
  [getFilterTransactionsStatisticError]: setError,
  [getTransactionsError]: setError,
  [addTransactionError]: setError,
  [deleteTransactionError]: setError,
  [getUpdatedTokenSuccess]: (_, __) => '',
  [getTransactionsSuccess]: (_, __) => '',
  [addTransactionSuccess]: (_, __) => '',
  [deleteTransactionSuccess]: (_, __) => '',
  [getFilterTransactionsStatisticSuccess]: (_, __) => '',
  [getTransactionsStatisticSuccess]: (_, __) => '',
  [userLogoutSuccess]: (_, __) => '',
});

const reducers = {
  itemsReducers,
  itemsReducersStatistic,
  loading,
  errorTransactionsReducers,
};

export default reducers;
