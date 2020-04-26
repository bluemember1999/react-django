import React, { Component } from 'react';
import {
  Modal,
} from 'antd';
import { TimezoneForm } from 'components';

class TimezoneModal extends Component {
  render() {
    const {
      isVisible,
      currentTimezone,
      handleToggle,
      handleSubmit,
    } = this.props;

    return (
      <Modal 
        title="Timezone Modal"
        visible={isVisible}
        okButtonProps={{ form: 'timezone-form', key: 'submit', htmlType: 'submit' }}
        onCancel={handleToggle}
      >
        <TimezoneForm
          currentTimezone={currentTimezone}
          handleSubmit={handleSubmit}
        />
      </Modal>
    );
  }
}

export default TimezoneModal;