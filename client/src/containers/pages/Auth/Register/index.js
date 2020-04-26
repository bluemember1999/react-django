import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'antd';
import { REGISTER } from 'store/constants/auth';
import { register } from 'store/actions/auth';
import { 
  selectAuthStatus, 
  selectAuthError, 
} from 'store/selectors/auth';
import { RegisterForm } from 'components';
import { withRouter } from 'react-router';

const RegisterPage = ({
  status,
  error,
  register,
}) => {
  const registering = status === REGISTER.REQUEST;
  const failureRegister = status === REGISTER.FAILURE;

  return (
    <div className="auth-page register-page">
      <h2 className="auth-page__heading">REGISTER</h2>
      { failureRegister && 
        <Alert 
          message={error} 
          type="error" 
          style={{ marginBottom: 20 }}
          showIcon
          banner 
        />
      }
      <RegisterForm
        handleRegister={(values) => register(values)}
        registering={registering}
      />
    </div>
  );
};

RegisterPage.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  register: PropTypes.func,
};

RegisterPage.defaultProps = {
  status: 'INIT',
  error: null,
  register: null,
};

const selectors = createStructuredSelector({
  status: selectAuthStatus,
  error: selectAuthError,
});
const actions = { register };

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(RegisterPage);