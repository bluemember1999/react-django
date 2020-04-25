import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'antd';
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
      <div className="auth-page register-page">
        <h2 className="auth-page__heading">REGISTER</h2>
        { failureRegister && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} banner /> }
        <RegisterForm
          handleRegister={this.handleRegister}
          registering={registering}
        />
      </div>
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