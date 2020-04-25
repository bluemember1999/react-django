import React, { Component } from 'react';
import {
  Modal,
} from 'antd';
import { UserForm } from 'components';

class UserModal extends Component {
  render() {
    const {
      isVisible,
      currentUser,
      handleToggle,
      handleSubmit,
    } = this.props;

    return (
      <Modal 
        title="User Modal"
        visible={isVisible}
        okButtonProps={{ form: 'user-form', key: 'submit', htmlType: 'submit' }}
        onCancel={handleToggle}
      >
        <UserForm
          currentUser={currentUser}
          handleSubmit={handleSubmit}
        />
      </Modal>
    );
  }
}

export default UserModal;