import * as yup from 'yup';

const validationSchemaLogin = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .max(12, 'Password should be of maximum 12 characters length')
    .required('Password is required'),
});

export default validationSchemaLogin;
