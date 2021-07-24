import { useSelector } from 'react-redux';
import { selectorsAuth } from '../../redux/auth';
import alpacaImg from '../../images/Alpaca.gif';

export default function Alpaca() {
  const name = useSelector(selectorsAuth.getUsername);

  return (
    <>
      <div className="alpacaText">
        <p>
          Привет, <span className="userName">{name}</span>!
        </p>
        <img className="alpacaImg" src={alpacaImg} alt="alpaca" />
        <p>Я твой персональный финасовый менеджер.</p>
        <p>Вместе мы проконтролируем твои расходы,</p>
        <p>чтобы ты смог собрать деньги на мечту!</p>
        <p>Запиши свой первый регулярный доход.</p>
      </div>
    </>
  );
}
