import React from 'react';
import { Button } from 'reactstrap';
import {
  AvForm,
  AvField,
} from 'availity-reactstrap-validation';

const LoginForm = ({ loggingIn, handleValidSubmit }) => (
  <AvForm
    onValidSubmit={handleValidSubmit}
  >
    <AvField
      name="email"
      label="Email"
      type="text"
      validate={{
        required: true,
        email: true
      }}
    />
    <AvField
      name="password"
      label="Password"
      type="password"
      validate={{
        required: {
          value: true,
          errorMessage: "Please enter your password"
        },
      }}
    />
    <Button 
      id="submit"
      disabled={loggingIn}
    >
      Submit
    </Button>
  </AvForm>
);

export default LoginForm;