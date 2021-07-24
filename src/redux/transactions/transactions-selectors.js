const getAllTransactions = state => {
  return state.transactions.items;
};

const getTransactionsStatistic = state => {
  return state.transactions.statistic;
};

const getLoading = state => {
  return state.transactions.loading;
};

const getError = state => {
  return state.transactions.errorStat;
};

export { getAllTransactions, getLoading, getTransactionsStatistic, getError };
