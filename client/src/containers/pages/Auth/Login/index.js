import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'antd';
import { LOGIN } from 'store/constants/auth';
import { logIn } from 'store/actions/auth';
import {
  selectAuthStatus,
  selectAuthError,
} from 'store/selectors/auth';
import { LoginForm } from 'components';

export const LoginPage = ({
  status,
  error,
  logIn,
}) => {
  const loggingIn = status === LOGIN.REQUEST;
  const failureLogIn = status === LOGIN.FAILURE;

  return (
    <div className="auth-page login-page">
      <h2 className="auth-page__heading">LOG IN</h2>
      { failureLogIn && 
        <Alert 
          message={error} 
          type="error"
          style={{ marginBottom: 20 }} 
          showIcon
          banner 
        /> 
      }
      <LoginForm 
        handleLogin={(values) => logIn(values)}
        loggingIn={loggingIn}
      />
    </div>
  );
};

LoginPage.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  logIn: PropTypes.func,
};

LoginPage.defaultProps = {
  status: 'INIT',
  error: null,
  logIn: null,
};

const selectors = createStructuredSelector({
  status: selectAuthStatus,
  error: selectAuthError,
});
const actions = { logIn };

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(LoginPage);
