import * as yup from 'yup';

const validationSchemaRegistr = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .max(12, 'Password should be of maximum 12 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm Password is required'),
  name: yup
    .string()
    .min(1, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
});

export default validationSchemaRegistr;
