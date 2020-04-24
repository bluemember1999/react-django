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
import { LOGIN } from 'store/constants/auth';
import { logIn } from 'store/actions/auth';
import { selectLoggedIn, selectAuthStatus, selectAuthError } from 'store/selectors/auth';
import { LoginForm } from 'components'; 
import { withRouter } from 'react-router';

class LoginPage extends Component {
  handleLogin = (events, values) => {
    const { logIn } = this.props;

    events.preventDefault();
    logIn(values);
  }

  render() {
    const { status, error } = this.props;
    const loggingIn = status === LOGIN.REQUEST;
    const failureLogIn = status === LOGIN.FAILURE;

    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Jumbotron className="jumbotron-login">
          <h3 className="d-flex justify-content-center">
            <u>Login Form</u>
          </h3>
          <hr />
          { failureLogIn && <Alert>{ error }</Alert> }
          <Card>
            <CardBody>
              <LoginForm 
                handleValidSubmit={this.handleLogin}
                loggingIn={loggingIn}
              />
            </CardBody>
          </Card>
        </Jumbotron>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
  status: PropTypes.string,
  error: PropTypes.string,
  logIn: PropTypes.func,
};

LoginPage.defaultProps = {
  loggedIn: false,
  history: {},
  status: '',
  error: '',
  logIn: null,
};

const selectors = createStructuredSelector({
  loggedIn: selectLoggedIn,
  status: selectAuthStatus,
  error: selectAuthError,
});
const actions = {
  logIn,
};

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(LoginPage);
