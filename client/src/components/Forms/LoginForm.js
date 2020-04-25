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
import Validators from './Validators';

class LoginForm extends React.Component {
  handleSubmit = (values) => {
    const { handleLogin } = this.props;

    handleLogin(values);
  }

  render() {
    const { loggingIn } = this.props;

    return (
      <Form
        name="login-form"
        className="login-form"
        onFinish={this.handleSubmit}
      >
        <Form.Item name="email" rules={Validators.email.rules}>
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={Validators.password.rules}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="space-around" align="middle">
            <Button type="primary" htmlType="submit" loading={loggingIn}>
              Log In
            </Button>
            <Link to="/register">
              <Button loading={loggingIn}>
                Register
              </Button>
            </Link>
          </Row>
        </Form.Item>
      </Form>
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