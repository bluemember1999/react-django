import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Row,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { SubmitButton } from 'components';
import Validators from './Validators';

const LoginForm = ({
  loggingIn,
  handleLogin,
}) => (
  <Form
    name="login-form"
    className="login-form"
    onFinish={handleLogin}
  >
    <Form.Item
      name="email"
      rules={Validators.email.rules}
    >
      <Input
        type="email"
        prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Email"
      />
    </Form.Item>
    <Form.Item
      name="password"
      rules={Validators.password.rules}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Row
        type="flex"
        justify="space-around"
        align="middle"
      >
        <SubmitButton
          loading={loggingIn}
          name="Log In"
        />
        <Link to="/register">
          <Button loading={loggingIn}>
            Register
          </Button>
        </Link>
      </Row>
    </Form.Item>
  </Form>
);

LoginForm.propTypes = {
  loggingIn: PropTypes.bool,
  handleLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  loggingIn: false,
  handleLogin: null,
};

export default LoginForm;