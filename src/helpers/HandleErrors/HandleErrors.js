import { OperationsAuth } from '../../redux/auth';

const GetError = errorData => dispatch => {
  const { error, requestedCallback, requestData } = errorData;
  if (error === 401) {
    requestData
      ? dispatch(OperationsAuth.refreshToken(requestedCallback, requestData))
      : dispatch(OperationsAuth.refreshToken(requestedCallback));
  }
};

export { GetError };
