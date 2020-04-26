import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { TimezoneForm } from 'components';

const TimezoneModal = ({
  isVisible,
  currentTimezone,
  handleClose,
  handleSave,
}) => (
  <Modal 
    title="Timezone Modal"
    visible={isVisible}
    okButtonProps={{ 
      form: 'timezone-form', 
      key: 'submit', 
      htmlType: 'submit',
    }}
    onCancel={handleClose}
  >
    <TimezoneForm
      currentTimezone={currentTimezone}
      handleSave={handleSave}
    />
  </Modal>
);

TimezoneModal.propTypes = {
  isVisible: PropTypes.bool,
  currentTimezone: PropTypes.object,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
};

TimezoneModal.defaultProps = {
  isVisible: false,
  currentTimezone: {},
  handleClose: null,
  handleSave: null,
};

export default TimezoneModal;