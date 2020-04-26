import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { UserForm } from 'components';

const UserModal = ({
  isVisible,
  isAdmin,
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
      isAdmin={isAdmin}
      currentUser={currentUser}
      handleSave={handleSave}
    />
  </Modal>
);

UserModal.propTypes = {
  isVisible: PropTypes.bool,
  isAdmin: PropTypes.bool,
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
};

UserModal.defaultProps = {
  isVisible: false,
  isAdmin: false,
  currentUser: {},
  handleClose: null,
  handleSave: null,
};

export default UserModal;
