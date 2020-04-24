import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Alert,
  Card,
  CardBody,
  Container,
  Jumbotron,
} from 'reactstrap';
import { REGISTER } from 'store/constants/auth';
import { register } from 'store/actions/auth';
import { selectLoggedIn, selectAuthStatus, selectAuthError } from 'store/selectors/auth';
import { RegisterForm } from 'components';
import { withRouter } from 'react-router';

export class RegisterPage extends Component {
  handleRegister = (values) => {
    const { register } = this.props;

    register(values);
  }

  render() {
    const { status, error } = this.props;
    const registering = status === REGISTER.REQUEST;
    const failureRegister = status === REGISTER.FAILURE;

    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Jumbotron className="jumbotron-form__register">
          <h3 className="d-flex justify-content-center">
            <u>Register Form</u>
          </h3>
          <hr />
          { failureRegister && <Alert>{ error }</Alert> }
          <Card>
            <CardBody>
              <RegisterForm
                handleValidSubmit={this.handleRegister}
                registering={registering}
              />
            </CardBody>
          </Card>
        </Jumbotron>
      </Container>
    );
  }
}

RegisterPage.propTypes = {
  loggedIn: PropTypes.bool,
  status: PropTypes.string,
  error: PropTypes.string,
  register: PropTypes.func,
};

RegisterPage.defaultProps = {
  loggedIn: false,
  status: 'INIT',
  error: null,
  register: null,
};

const selectors = createStructuredSelector({
  loggedIn: selectLoggedIn,
  status: selectAuthStatus,
  error: selectAuthError,
});
const actions = {
  register,
};

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(RegisterPage);