import React from 'react';
import { useDispatch } from 'react-redux';
import { OperationsAuth } from '../../redux/auth';
import { useFormik } from 'formik';

import validationSchemaLogin from '../Shared/ValidationSchema/ValidationSchemaLogin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import headerLogo from '../../images/header-logo.png';

import { NavLink } from 'react-router-dom';
import routes from '../../routes';

export default function LoginForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: values => {
      const { email, password } = values;
      dispatch(OperationsAuth.loginUser({ email, password }));
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

        <div className="login-form-btn-container">
          <Button className="btn-form current" type="submit">
            Вход
          </Button>

          <NavLink to={routes.register}>
            <Button className="btn-form">Регистрация</Button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
