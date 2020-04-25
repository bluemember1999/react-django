import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
} from 'antd';
import {
  FieldTimeOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { logout } from 'store/actions/auth';

const { Header, Content, } = Layout;

class CustomLayout extends Component {
  handleLogout = () => {
    const { logout } = this.props;

    logout();
  }
  
  render() {
    const { pathname } = this.props.location;
    const selectedKey = ['/timezone', '/user'].indexOf(pathname) >= 0 ? pathname : '/timezone';

    return (
      <Layout>
        <Header>
          <Row type="flex" justify="space-between" align="middle">
            <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
              <Menu.Item key="/timezone">
                <Link to="/timezone">
                  <FieldTimeOutlined />
                  Timezone
                </Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">
                  <UserOutlined />
                  User
                </Link>
              </Menu.Item>
            </Menu>
            <Button type="link" icon={<LogoutOutlined />} onClick={this.handleLogout}>
              Log out
            </Button>
          </Row>
        </Header>
        <Content>
          <Row className="main-layout">
            <Col span={20} offset={2}>
              { this.props.children }
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

const selectors = createStructuredSelector({

});
const actions = {
  logout
};

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(CustomLayout);