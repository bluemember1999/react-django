import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Row,
} from 'antd';
import Validators from './Validators';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0, },
    sm: { span: 16, offset: 8, },
  },
};

class RegisterForm extends React.Component {
  handleSubmit = (values) => {
    const { handleRegister } = this.props;

    handleRegister(values);
  }
  
  render() {
    const { registering } = this.props;

    return (
      <Form
        name="register-form"
        className="register-form"
        onFinish={this.handleSubmit}
        scrollToFirstError
        {...formItemLayout}
      >
        <Form.Item label="First Name" name="first_name" rules={Validators.first_name.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name" rules={Validators.last_name.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username" rules={Validators.username.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={Validators.email.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={Validators.password.rules}>
          <Input.Password />
        </Form.Item>
        <Form.Item 
          label="Confirm Password" 
          name="confirm_password"
          rules={
            [
              { reuiqred: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]
          }
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Row type="flex" justify="space-around" align="middle">
            <Button type="primary" htmlType="submit" loading={registering}>
              Register
            </Button>
            <Link to="/login">
              <Button loading={registering}>
                Log In
              </Button>
            </Link>
          </Row>
        </Form.Item>
      </Form>
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