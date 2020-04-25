import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Select,
} from 'antd';
import Validators from './Validators';

const { Option } = Select;
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

class UserForm extends React.Component {
  handleSubmit = (values) => {
    const { handleSubmit } = this.props;

    handleSubmit(values);
  }
  
  render() {
    const { currentUser } = this.props;

    return (
      <Form
        id="user-form"
        name="user-form"
        className="user-form"
        onFinish={this.handleSubmit}
        initialValues={currentUser}
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
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Input.Group compact>
            <Select>
              <Option value="USER">USER</Option>
              <Option value="MANAGER">MANAGER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Input.Group>
        </Form.Item>
      </Form>
    );
  }
}

UserForm.propTypes = {
  registering: PropTypes.bool,
  handleValidSubmit: PropTypes.func,
};

UserForm.defaultProps = {
  registering: false,
  handleValidSubmit: null,
};

export default UserForm;