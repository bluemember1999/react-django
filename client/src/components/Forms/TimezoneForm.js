import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Select,
} from 'antd';
import Validators from './Validators';
import Timezones from './Timezone';

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

const TimezoneForm = ({
  currentTimezone,
  handleSave,
}) => (
  <Form
    id="timezone-form"
    name="timezone-form"
    className="timezone-form"
    onFinish={handleSave}
    initialValues={currentTimezone}
    scrollToFirstError
    {...formItemLayout}
  >
    <Form.Item
      label="Name"
      name="name"
      rules={Validators.timezone_name.rules}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Name Of City"
      name="name_of_city"
      rules={Validators.name_of_city.rules}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Difference To GMT"
      name="difference_to_GMT"
      rules={Validators.difference_to_GMT.rules}
    >
      <Select>
        {
          Timezones.timezones.map((item, index) => (
            <Select.Option 
              value={item}
              index={index}
            >
              {item}
            </Select.Option>
          ))
        }
      </Select>
    </Form.Item>
  </Form>
);

TimezoneForm.propTypes = {
  currentTimezone: PropTypes.object,
  handleSave: PropTypes.func,
};

TimezoneForm.defaultProps = {
  currentTimezone: {},
  handleSave: null,
};

export default TimezoneForm;