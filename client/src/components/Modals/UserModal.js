import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { UserForm } from 'components';

const UserModal = ({
  isVisible,
  currentUser,
  handleClose,
  handleSave,
}) => (
  <Modal 
    title="User Modal"
    visible={isVisible}
    okButtonProps={{ 
      form: 'user-form', 
      key: 'submit', 
      htmlType: 'submit' 
    }}
    onCancel={handleClose}
  >
    <UserForm
      currentUser={currentUser}
      handleSave={handleSave}
    />
  </Modal>
);

UserModal.propTypes = {
  isVisible: PropTypes.bool,
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
};

UserModal.defaultProps = {
  isVisible: false,
  currentUser: {},
  handleClose: null,
  handleSave: null,
};

export default UserModal;
