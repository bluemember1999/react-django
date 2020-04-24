import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  FormGroup,
  Row,
} from 'reactstrap';
import {
  AvForm,
  AvField,
} from 'availity-reactstrap-validation';

class RegisterForm extends React.Component {
  handleSubmit = (event, values) => {
    const { handleValidSubmit } = this.props;

    event.preventDefault();
    handleValidSubmit(values);
  }

  render() {
    const { registering } = this.props;

    return (
      <AvForm 
        onValidSubmit={this.handleSubmit}
      >
        <Row>
          <Col>
            <AvField
              name="first_name"
              label="First Name"
              type="text"
              validate={{
                required: true,
              }}
            />
          </Col>
          <Col>
            <AvField
              name="last_name"
              label="Last Name"
              type="text"
              validate={{
                required: true,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <AvField
              name="username"
              label="Username"
              type="text"
              validate={{
                required: true,
              }}
            />
          </Col>
          <Col>
            <AvField
              name="email"
              label="Email"
              type="text"
              validate={{
                required: true,
                email: true,
              }}
            />
          </Col>
        </Row>
        <FormGroup>
          <Row className="justify-content-center">
            <Button id="submit" disabled={registering} color="success">
              Register
            </Button>
            <Link to="/login">
              <Button disabled={registering} color="link">
                Log In
              </Button>
            </Link>
          </Row>
        </FormGroup>
      </AvForm>
    );
  }
}

RegisterForm.propTypes = {
  registering: PropTypes.bool,
  handleValidSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  registering: false,
  handleValidSubmit: null,
};

export default RegisterForm;