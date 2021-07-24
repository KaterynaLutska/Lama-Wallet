import { useDispatch } from 'react-redux';
import { OperationsAuth } from '../../redux/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function ModalLogout() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(OperationsAuth.logoutUser());
  };

  return (
    <button type="button" className="btnLogout" onClick={onLogout}>
      <ExitToAppIcon className="icon" />
      <p className="text">Выйти</p>
    </button>
  );
}
