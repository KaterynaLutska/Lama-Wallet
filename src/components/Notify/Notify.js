import { store } from 'react-notifications-component';

const notificationError = {
  container: 'top-right',
  animationIn: ['animate__animated animate__fadeIn'],
  animationOut: ['animate__animated animate__fadeOut'],
  dismiss: {
    duration: 4000,
    onScreen: true,
  },
};

export default function Notify(prop, name) {
  if (prop.status === 'Success') {
    store.addNotification({
      ...notificationError,
      type: 'success',
      message: prop.status,
      title: `Привет, дорогой ${
        name ? name : 'Гость'
      }! На Вашу электронную почту ${
        prop.payload.email
      } отправлено письмо для верификации!`,
    });
  } else {
    store.addNotification({
      ...notificationError,
      type: 'danger',
      message: prop,
      title: `Привет, дорогой ${
        name ? name : 'Гость'
      }! Что-то пошло не так, попробуй еще раз!`,
    });
  }
}
