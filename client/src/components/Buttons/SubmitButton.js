import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const SubmitButton = ({
  loading,
  name,
}) => (
  <Button
    type="primary"
    htmlType="submit"
    loading={loading}
  >
    { name }
  </Button>
);

SubmitButton.propTypes = {
  loading: PropTypes.bool, 
  name: PropTypes.string,
};

SubmitButton.defaultProps = {
  loading: false,
  name: ''
};

export default SubmitButton;