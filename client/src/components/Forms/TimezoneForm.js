import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
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

class TimezoneForm extends Component {
  handleSubmit = (values) => {
    const { handleSubmit } = this.props;

    handleSubmit(values);
  }
  
  render() {
    const { currentTimezone } = this.props;

    return (
      <Form
        id="timezone-form"
        name="timezone-form"
        className="timezone-form"
        onFinish={this.handleSubmit}
        initialValues={currentTimezone}
        scrollToFirstError
        {...formItemLayout}
      >
        <Form.Item label="Name" name="name" rules={Validators.timezone_name.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Name Of City" name="name_of_city" rules={Validators.name_of_city.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Difference To GMT" name="difference_to_GMT" rules={Validators.difference_to_GMT.rules}>
          <Input />
        </Form.Item>
        <Form.Item label="User" name="user">
          <Input />
        </Form.Item>
      </Form>
    );
  }
}

TimezoneForm.propTypes = {
  handleValidSubmit: PropTypes.func,
};

TimezoneForm.defaultProps = {
  handleValidSubmit: null,
};

export default TimezoneForm;