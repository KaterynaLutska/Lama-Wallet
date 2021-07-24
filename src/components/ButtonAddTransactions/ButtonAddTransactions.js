import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectorsAuth, ActionAuth } from '../../redux/auth';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import grey from '@material-ui/core/colors/grey';

export default function ButtonAddTransaction() {
  const dispatch = useDispatch();
  const isShowModal = useSelector(selectorsAuth.getShowModal);

  const toggleModal = () => {
    dispatch(ActionAuth.showModal(!isShowModal));
  };

  return (
    <div>
      <button type="button" className="BtnAddTransaction" onClick={toggleModal}>
        <Icon style={{ color: grey[100], fontSize: 10 }}>
          <AddIcon />
        </Icon>
      </button>
    </div>
  );
}
