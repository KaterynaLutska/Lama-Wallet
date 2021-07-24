import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectorsAuth, ActionAuth } from '../../../redux/auth';

export default function Modal({ children }) {
  const dispatch = useDispatch();
  const isShowModal = useSelector(selectorsAuth.getShowModal);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const toggleModal = () => {
    dispatch(ActionAuth.showModal(!isShowModal));
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };
  const OnBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className="overlay" onClick={OnBackdropClick}>
      <div className="modal"> {children}</div>
    </div>
  );
}
