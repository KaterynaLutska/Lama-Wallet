import {
  getCurrentUserSuccess,
  gentCurrentUserError,
  userLoginSuccess,
  userLoginError,
  userRegisterSuccess,
  userRegisterError,
  userLogoutSuccess,
  userLogoutError,
  showModal,
  getUpdatedTokenSuccess,
  getUpdatedTokenError,
} from './auth-actions';

import { createReducer, combineReducers } from '@reduxjs/toolkit';

const initialState = { email: null, name: null };

const userReducer = createReducer(initialState, {
  [userLoginSuccess]: (_, { payload: { token, refreshToken, ...userData } }) =>
    userData,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [userLogoutSuccess]: (_, __) => initialState,
});

const tokenReducer = createReducer(initialState, {
  [userLoginSuccess]: (_, { payload }) => payload.token,
  [getUpdatedTokenSuccess]: (_, { payload }) => payload.token,
  [userLogoutSuccess]: () => null,
  [getUpdatedTokenError]: () => null,
});

const refreshTokenReducer = createReducer(initialState, {
  [userLoginSuccess]: (_, { payload }) => payload.refreshToken,
  [getUpdatedTokenSuccess]: (_, { payload }) => payload.refreshToken,
  [userLogoutSuccess]: () => null,
  [getUpdatedTokenError]: () => null,
});

const isAutorizedReducer = createReducer(false, {
  [getCurrentUserSuccess]: () => true,
  [userLoginSuccess]: () => true,
  [userLoginError]: () => false,
  [userLogoutSuccess]: () => false,
  [userRegisterError]: () => false,
  [gentCurrentUserError]: () => false,
  [getUpdatedTokenError]: () => false,
});

const setError = (_, { payload }) => payload;

const errorReducers = createReducer(null, {
  [userRegisterError]: setError,
  [userLoginError]: setError,
  [userLogoutError]: setError,
  [gentCurrentUserError]: setError,
  [getUpdatedTokenError]: setError,
  [userLoginSuccess]: (_, __) => '',
  [userLogoutSuccess]: (_, __) => '',
  [userRegisterSuccess]: (_, __) => '',
});

const showModalReducer = createReducer(false, {
  [showModal]: (_, { payload }) => payload,
  [getUpdatedTokenError]: () => false,
});

const authReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  refreshToken: refreshTokenReducer,
  isAutorized: isAutorizedReducer,
  errors: errorReducers,
  showModal: showModalReducer,
});

export default authReducers;
