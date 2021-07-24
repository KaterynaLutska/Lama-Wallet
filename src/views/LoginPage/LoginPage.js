import React from 'react';
import Container from '../../components/Container/Container';
import LoginForm from '../../components/LoginForm/LoginForm';
import img from '../../images/login-page.png';

export default function LoginPage() {
  return (
    <div className="login-page-bcgi">
      <Container>
        <div className="mainPage">
          <div className="left">
            <img src={img} alt="finance app" className="img" />
            <h1 className="title">Finance App</h1>
          </div>
          <div className="right">
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
