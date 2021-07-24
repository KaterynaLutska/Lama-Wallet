import React from 'react';
import { useDispatch } from 'react-redux';
import { OperationsAuth } from '../../redux/auth';
import { useFormik } from 'formik';

import validationSchemaRegistr from '../Shared/ValidationSchema/ValidationSchemaRegistr';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import headerLogo from '../../images/header-logo.png';

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validationSchema: validationSchemaRegistr,
    onSubmit: values => {
      const { name, email, password } = values;
      dispatch(OperationsAuth.registerUser({ name, email, password }));
    },
  });

  return (
    <div className="formWrapp">
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="logo">
          <img className="img" src={headerLogo} alt="logo" />
          <h1 className="title">Lama-Wallet</h1>
        </div>

        <TextField
          className="textField"
          InputProps={{
            endAdornment: (
              <Icon color="action" position="start">
                <EmailIcon />
              </Icon>
            ),
          }}
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          className="textField"
          InputProps={{
            endAdornment: (
              <Icon color="action" position="start">
                <LockIcon />
              </Icon>
            ),
          }}
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          className="textField"
          InputProps={{
            endAdornment: (
              <Icon color="action" position="start">
                <LockIcon />
              </Icon>
            ),
          }}
          id="confirmPassword"
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <TextField
          className="textField"
          InputProps={{
            endAdornment: (
              <Icon color="action" position="start">
                <AccountBoxIcon />
              </Icon>
            ),
          }}
          id="name"
          name="name"
          label="Ваше имя"
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <div className="login-form-btn-container">
          <Button className="btn-form current" type="submit">
            Регистрация
          </Button>

          <NavLink to={routes.login}>
            <div>
              <Button className="btn-form">Вход</Button>
            </div>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
