import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Input,
} from 'antd';
import {
  FieldTimeOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { logout } from 'store/actions/auth';
import { getUsers } from 'store/actions/user';
import { getTimezones } from 'store/actions/timezone';
import {
  selectIsAdmin,
  selectIsManager,
  selectIsUser,
} from 'store/selectors/auth';
import _ from 'lodash';

const {
  Header,
  Content,
} = Layout;

const CustomLayout = ({
  isAdmin,
  isManager,
  isUser,
  children,
  location,
  getUsers,
  getTimezones,
  logout,
}) => {
  const { pathname } = location;
  const selectedKey = 
    _.includes(['/timezone', '/user'], pathname) ? pathname : '/timezone';
  const handleSearch = (value) => {
    const isTimezoneURL = pathname.includes('timezone');
    const isUserURL = pathname.includes('user');
    
    if (isTimezoneURL) {
      getTimezones({
        search: value,
        pageNo: 1,
      });
    }
    if (isUserURL) {
      getUsers({
        search: value,
        pageNo: 1,
      });
    }
  };

  return (
    <Layout>
      <Header>
        <Row
          type="flex" 
          justify="space-between" 
          align="middle"
        >
          <Menu
            theme="dark" 
            mode="horizontal" 
            selectedKeys={[selectedKey]}
          >
            { (isAdmin || isUser) &&
              <Menu.Item key="/timezone">
                <Link to="/timezone">
                  <FieldTimeOutlined />
                  Timezone
                </Link>
              </Menu.Item>
            }
            {
              (isAdmin || isManager) &&
              <Menu.Item key="/user">
                <Link to="/user">
                  <UserOutlined />
                  User
                </Link>
              </Menu.Item>
            }
          </Menu>
          <Row
            justify="end" 
            align="middle"
          >
            <Input.Search
              placeholder="Please input search text"
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button 
              type="link" 
              icon={<LogoutOutlined />} 
              onClick={logout}
            >
              Log out
            </Button>
          </Row>
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

const selectors = createStructuredSelector({
  isAdmin: selectIsAdmin,
  isManager: selectIsManager,
  isUser: selectIsUser,
});
const actions = {
  getUsers,
  getTimezones,
  logout,
};

CustomLayout.propTypes = {
  isAdmin: PropTypes.bool,
  isManager: PropTypes.bool,
  isUser: PropTypes.bool,
  children: PropTypes.node,
  location: PropTypes.object,
  getUsers: PropTypes.func,
  getTimezones: PropTypes.func,
  logout: PropTypes.func,
};

CustomLayout.defaultProps = {
  isAdmin: false,
  isManager: false,
  isUser: true,
  children: null,
  location: {},
  getUsers: null,
  getTimezones: null,
  logout: null,
};

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(CustomLayout);