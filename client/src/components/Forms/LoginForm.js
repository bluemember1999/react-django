import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  FormGroup,
  Row,
} from 'reactstrap';
import {
  AvForm,
  AvField,
} from 'availity-reactstrap-validation';

class LoginForm extends React.Component {
  handleSubmit = (event, values) => {
    const { handleValidSubmit } = this.props;

    event.preventDefault();
    handleValidSubmit(values);
  }

  render() {
    const { loggingIn } = this.props;

    return (
      <AvForm
        onValidSubmit={this.handleSubmit}
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
        <FormGroup>
          <Row className="justify-content-center">
            <Button id="submit" disabled={loggingIn} color="success">
              Log In
            </Button>
            &nbsp;
            <Link to="/register">
              <Button disabled={loggingIn} color="link">
                Register
              </Button>
            </Link>
          </Row>
        </FormGroup>
      </AvForm>
    );
  }
}

LoginForm.propTypes = {
  loggingIn: PropTypes.bool,
  handleValidSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  loggingIn: false,
  handleValidSubmit: null,
};

export default LoginForm;