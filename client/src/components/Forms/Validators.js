export default {
  email: {
    rules: [
      { required: true, message: 'Please input your email!' },
      { type: 'email', message: 'Please input valid email!'},
    ],
  },
  username: {
    rules: [
      { required: true, message: 'Please input your username!', whitespace: true },
    ],
  },
  password: {
    rules: [
      { required: true, message: 'Please input your password!' },
    ],
  },
  first_name: {
    rules: [
      { required: true, message: 'Please input your first name!', whitespace: true },
    ],
  },
  last_name: {
    rules: [
      { required: true, message: 'Please input your last name!', whitespace: true },
    ],
  },
  role: {
    rules: [
      { required: true, message: 'Please select your role!' },
    ],
  },
};