import React from 'react';
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
import _ from 'lodash';

const {
  Header,
  Content,
} = Layout;

const CustomLayout = ({ children, location, logout }) => {
  const { pathname } = location;
  const selectedKey = 
    _.includes(['/timezone', '/user'], pathname) ? pathname : '/timezone';

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
          <Button 
            type="link" 
            icon={<LogoutOutlined />} 
            onClick={logout}
          >
            Log out
          </Button>
        </Row>
      </Header>
      <Content>
        <Row className="main-layout">
          <Col
            span={20} 
            offset={2}
          >
            { children }
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const selectors = createStructuredSelector({});
const actions = { logout };

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(CustomLayout);