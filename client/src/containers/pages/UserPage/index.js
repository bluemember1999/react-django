import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Alert,
  Layout,
  Popconfirm,
  Button,
  Space,
  Row,
  Col,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from 'store/constants/user';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from 'store/actions/user';
import { selectIsAdmin } from 'store/selectors/auth';
import {
  selectUsers,
  selectUserTotal,
  selectUserStatus,
  selectUserError,
} from 'store/selectors/user';
import {
  CustomTable,
  UserModal,
} from 'components';
import _ from 'lodash';

const { Content } = Layout;

class UserPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      columns: [
        {
          title: 'No',
          key: 'index',
          render: (text, record, index) => index + 1,
        },
        {
          title: 'First Name',
          dataIndex: 'first_name',
          key: 'first_name',
        },
        {
          title: 'Last Name',
          dataIndex: 'last_name',
          key: 'last_name',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          render: (text, record) => (
            <Space>
              <Button 
                color="primary" 
                icon={<EditOutlined />} 
                onClick={() => this.handleEditShow(record.key)} 
              />
              <Popconfirm 
                title="Sure to delete?" 
                onConfirm={() => this.handleDelete(record.key)}
              >
                <Button 
                  color="primary" 
                  icon={<DeleteOutlined />} 
                />
              </Popconfirm>
            </Space>
          ),
        },
      ],
      currentUser: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    const { getUsers } = this.props;

    getUsers({ pageNo: 1 });
  }

  getRequestStatus = () => {
    const { status } = this.props;
    const requests = [
      GET_USERS.REQUEST,
      CREATE_USER.REQUEST,
      UPDATE_USER.REQUEST,
      DELETE_USER.REQUEST,
    ];

    return _.includes(requests, status);
  }

  getFailureStatus = () => {
    const { status } = this.props;
    const failures = [
      GET_USERS.FAILURE,
      CREATE_USER.FAILURE,
      UPDATE_USER.FAILURE,
      DELETE_USER.FAILURE,
    ];

    return _.includes(failures, status);
  }

  setVisible = (isVisible = false) => {
    this.setState({ isVisible });
  }

  setCurrentUser = (currentUser = {}) => {
    this.setState({ currentUser });
  }

  handleCreateShow = () => {
    this.setCurrentUser({});
    this.setVisible(true);
  }

  handleEditShow = (key) => {
    const { users } = this.props;
    const index = users.findIndex((user)=> user.key === key);
    
    this.setCurrentUser(users[index]);
    this.setVisible(true);
  }

  handleCreateOrUpdate = (values) => {
    const { 
      createUser, 
      updateUser,
    } = this.props;
    const { currentUser } = this.state;

    if (Object.keys(currentUser).length === 0) {
      createUser(values);
    } else {
      updateUser({
        userId: currentUser.id,
        updatedUser: values,
      });
    }
    this.setVisible();
  }

  handleDelete = (key) => {
    const {
      users, 
      deleteUser,
    } = this.props;
    const index = users.findIndex((user) => user.key === key);
  
    deleteUser({ userId: users[index].id });
  }
  
  handlePaginate = (page) => {
    const { getUsers } = this.props;
    
    getUsers({ pageNo: page });
  }

  renderHeader = () => (
    <Row type="flex" justify="space-between">
      <Col>
        <h2>User Management</h2>
      </Col>
      <Col>
        <Button 
          icon={<UserAddOutlined />} 
          onClick={this.handleCreateShow}
        />
      </Col>
    </Row>
  );

  render() {
    const { 
      isAdmin,
      users,
      userTotal,
      error,
    } = this.props;
    const {
      currentUser,
      columns,
      isVisible,
    } = this.state;
    const loading = this.getRequestStatus();
    const failureStatus = this.getFailureStatus();
    
    return (
      <Layout>
        <Content>
          { failureStatus &&
            <Alert
              message={error}
              type="error"
              showIcon
              banner
            />
          }
          <CustomTable
            columns={columns}
            dataSource={users}
            total={userTotal}
            loading={loading}
            handlePaginate={this.handlePaginate}
            renderHeader={this.renderHeader}
          />
        </Content>
        { isVisible &&
          <UserModal
            isVisible={isVisible}
            isAdmin={isAdmin}
            currentUser={currentUser}
            handleClose={() => this.setVisible()}
            handleSave={this.handleCreateOrUpdate}
          />
        }
      </Layout>
    );
  }
}

const selectors = createStructuredSelector({
  isAdmin: selectIsAdmin,
  users: selectUsers,
  userTotal: selectUserTotal,
  status: selectUserStatus,
  error: selectUserError,
});
const actions = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default connect(selectors, actions)(UserPage);