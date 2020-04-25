import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'antd';
import { LOGIN } from 'store/constants/auth';
import { logIn } from 'store/actions/auth';
import { selectLoggedIn, selectAuthStatus, selectAuthError } from 'store/selectors/auth';
import { LoginForm } from 'components'; 

export class LoginPage extends Component {
  handleLogin = (values) => {
    const { logIn } = this.props;

    logIn(values);
  }

  render() {
    const { status, error } = this.props;
    const loggingIn = status === LOGIN.REQUEST;
    const failureLogIn = status === LOGIN.FAILURE;

    return (
      <div className="auth-page login-page">
        <h2 className="auth-page__heading">LOG IN</h2>
        { failureLogIn && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} banner /> }
        <LoginForm 
          handleLogin={this.handleLogin}
          loggingIn={loggingIn}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loggedIn: PropTypes.bool,
  status: PropTypes.string,
  error: PropTypes.string,
  logIn: PropTypes.func,
};

LoginPage.defaultProps = {
  loggedIn: false,
  status: 'INIT',
  error: null,
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
