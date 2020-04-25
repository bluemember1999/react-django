import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUsers } from 'store/selectors/user';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from 'store/actions/user';
import {
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
  CustomTable,
  UserModal,
} from 'components';

const { Content } = Layout;

class UserPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      columns: [
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
              <Button color="primary" icon={<EditOutlined />} onClick={() => this.handleEdit(record.key)} />
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <Button color="primary" icon={<DeleteOutlined />} />
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
    const { getUsers} = this.props;

    getUsers({
      pageNo: 1,
    });
  }

  handleCreate = () => {
    this.setState({
      currentUser: {},
      isVisible: true,
    });
  }

  handleDelete = (key) => {
    const { users, deleteUser } = this.props;
    const index = users.findIndex((user) => user.key === key);
  
    deleteUser({
      userId: users[index].id,
    });
  }

  handleEdit = (key) => {
    const { users } = this.props;
    const index = users.findIndex((user)=> user.key === key);
    
    this.setState({
      currentUser: users[index],
      isVisible: true,
    });
  }

  handleSave = (values) => {
    const { createUser, updateUser } = this.props;
    const { currentUser } = this.state;

    if (Object.keys(currentUser).length === 0) {
      createUser(values);
    } else {
      updateUser({
        userId: currentUser.id,
        updatedUser: values,
      });
    }
  }
  
  handleToggle = () => {
    this.setState({
      isVisible: false,
    });
  }

  renderHeader = () => {
    const { handleCreate } = this.props;

    return (
      <Row type="flex" justify="space-between">
        <Col>
          User Management
        </Col>
        <Col>
          <Button 
            icon={<UserAddOutlined />} 
            onClick={handleCreate}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const { users } = this.props;
    const { currentUser, columns, isVisible } = this.state;
    
    return (
      <Layout>
        <Content>
          <CustomTable
            columns={columns}
            dataSource={users}
            renderHeader={this.renderHeader}
          />
        </Content>  
        <UserModal
          isVisible={isVisible}
          currentUser={currentUser}
          handleToggle={this.handleToggle}
          handleSubmit={this.handleSave}
        />
      </Layout>
    );
  }
}

const selectors = createStructuredSelector({
  users: selectUsers,
});
const actions = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default connect(selectors, actions)(UserPage);