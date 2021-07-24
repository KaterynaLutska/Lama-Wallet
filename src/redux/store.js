import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import reducers from '../redux/transactions/transactions-reducer';
import authReducers from '../redux/auth/auth-reducer';

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token', 'refreshToken'],
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const transactionsReducer = combineReducers({
  items: reducers.itemsReducers,
  statistic: reducers.itemsReducersStatistic,
  errorStat: reducers.errorTransactionsReducers,
  loading: reducers.loading,
});

const AuthPersistedReducer = persistReducer(persistConfig, authReducers);

let store = configureStore({
  reducer: {
    auth: AuthPersistedReducer,
    transactions: transactionsReducer,
  },
  middleware,
});

let persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
