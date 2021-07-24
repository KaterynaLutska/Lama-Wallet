import React from 'react';
import Container from '../../components/Container/Container';
import RegistrationForm from '../../components/RegistrationForm/';

import img from '../../images/Frame.png';

export default function RegistrationPage() {
  return (
    <div className="login-page-bcgi">
      <Container>
        <div className="mainPage">
          <div className="left">
            <img src={img} alt="finance app" className="img" />
            <h1 className="title">Finance App</h1>
          </div>
          <div className="right">
            <RegistrationForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
