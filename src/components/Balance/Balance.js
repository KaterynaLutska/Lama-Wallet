import { useSelector } from 'react-redux';
import { Selectors } from '../../redux/transactions';
import Loader from 'react-loader-spinner';

export default function Balance() {
  let balance = 0;
  const transactions = useSelector(Selectors.getAllTransactions);

  transactions.map(el =>
    el.sort === 'Доход' ? (balance += el.amount) : (balance -= el.amount),
  );

  return (
    <>
      {balance !== 0 ? (
        <div className="balanceContainer">
          <h3 className="balanceTitle">Ваш баланс</h3>
          <span className="unicode">₴</span>
          <span className="balance">
            {new Intl.NumberFormat('ru-RU').format(balance)}
          </span>
        </div>
      ) : (
        <Loader className="loaderBalance" color="#24cca7" />
      )}
    </>
  );
}
