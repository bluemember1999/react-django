import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  AppstoreAddOutlined,
} from '@ant-design/icons';
import {
  GET_TIMEZONES,
  CREATE_TIMEZONE,
  UPDATE_TIMEZONE,
  DELETE_TIMEZONE,
} from 'store/constants/timezone';
import {
  getTimezones,
  createTimezone,
  updateTimezone,
  deleteTimezone,
} from 'store/actions/timezone';
import {
  selectTimezones,
  selectTimezoneTotal,
  selectTimezonePageNo,
  selectTimezoneStatus,
  selectTimezoneError,
} from 'store/selectors/timezone';
import {
  Clock,
  CustomTable,
  TimezoneModal,
} from 'components';
import _ from 'lodash';

const { Content } = Layout;

export class TimezonePage extends Component {
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
          title: 'User',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Name of City',
          dataIndex: 'name_of_city',
          key: 'name_of_city',
        },
        {
          title: 'Difference To GMT',
          dataIndex: 'difference_to_GMT',
          key: 'difference_to_GMT',
          render: (text) => (
            <span>
              { `UTC${text}` }
            </span>
          )
        },
        {
          title: 'Current Time in timezone',
          key: 'current_time',
          render: (text, record) => (
            <Clock offset={this.getTimezoneOffset(record.difference_to_GMT)}/>
          )
        },
        {
          title: 'Difference to Browser Time',
          key: 'difference_to_browser_time',
          render: (text, record) => (
            <span>{ `${(-new Date().getTimezoneOffset() + this.getTimezoneOffset(record.difference_to_GMT)) / 60 } hrs` }</span>
          )
        },
        {
          title: 'Actions',
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
      currentTimezone: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    const { getTimezones } = this.props;

    getTimezones({ pageNo: 1 });
  }

  getTimezoneOffset = (timezone) => {
    const numbers = timezone.match(/[0-9]{2}/g);
    const symbol = timezone[0] === '+' ? -1 : 1;

    if (numbers.length !== 2) {
      return 0;
    }

    return (Number(numbers[0]) * 60 + Number(numbers[1])) * symbol;
  }

  getTimeByTimezone = (timezone) => {
    return new Date(
      new Date().getTime() + (-this.getTimezoneOffset(timezone) * 60) * 1000
    ).toUTCString().replace( / GMT$/, "" );
  }

  getRequestStatus = () => {
    const { status } = this.props;
    const requests = [
      GET_TIMEZONES.REQUEST,
      CREATE_TIMEZONE.REQUEST,
      UPDATE_TIMEZONE.REQUEST,
      DELETE_TIMEZONE.REQUEST,
    ];

    return _.includes(requests, status);
  }

  getFailureStatus = () => {
    const { status } = this.props;
    const failures = [
      GET_TIMEZONES.FAILURE,
      CREATE_TIMEZONE.FAILURE,
      UPDATE_TIMEZONE.FAILURE,
      DELETE_TIMEZONE.FAILURE,
    ];

    return _.includes(failures, status);
  }

  setVisible = (isVisible = false) => {
    this.setState({ isVisible });
  }

  setCurrentTimezone = (currentTimezone = {}) => {
    this.setState({ currentTimezone });
  }

  handleCreateShow = () => {
    this.setCurrentTimezone();
    this.setVisible(true);
  }

  handleEditShow = (key) => {
    const { timezones } = this.props;
    const index = timezones.findIndex((timezone)=> timezone.key === key);
    
    this.setCurrentTimezone(timezones[index]);
    this.setVisible(true);
  }
  
  handleCreateOrUpdate = (values) => {
    const {
      createTimezone,
      updateTimezone,
    } = this.props;
    const { currentTimezone } = this.state;

    if (Object.keys(currentTimezone).length === 0) {
      createTimezone({ ...values });
    } else {
      updateTimezone({
        timezoneId: currentTimezone.id,
        updatedTimezone: values,
      });
    }
    this.setVisible();
  }

  handleDelete = (key) => {
    const {
      timezones,
      deleteTimezone,
    } = this.props;
    const index = timezones.findIndex((timezone) => timezone.key === key);
  
    deleteTimezone({ timezoneId: timezones[index].id });
  }

  handlePaginate = (page) => {
    const { getTimezones } = this.props;

    getTimezones({ pageNo: page });
  }

  renderHeader = () => (
    <Row type="flex" justify="space-between">
      <Col>
        <h2>Timezone Management</h2>
      </Col>
      <Col>
        <Button 
          icon={<AppstoreAddOutlined />} 
          onClick={this.handleCreateShow}
        />
      </Col>
    </Row>
  );

  render() {
    const {
      timezones,
      timezoneTotal,
      timezonePageNo,
      error,
    } = this.props;
    const {
      currentTimezone,
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
            dataSource={timezones}
            total={timezoneTotal}
            pageNo={timezonePageNo}
            loading={loading}
            handlePaginate={this.handlePaginate}
            renderHeader={this.renderHeader}
          />
        </Content>  
        { isVisible && 
          <TimezoneModal
            isVisible={isVisible}
            currentTimezone={currentTimezone}
            handleClose={() => this.setVisible()}
            handleSave={this.handleCreateOrUpdate}
          />
        }
      </Layout>
    );
  }
}

const selectors = createStructuredSelector({
  timezones: selectTimezones,
  timezoneTotal: selectTimezoneTotal,
  timezonePageNo: selectTimezonePageNo,
  status: selectTimezoneStatus,
  error: selectTimezoneError,
});
const actions = {
  getTimezones,
  createTimezone,
  updateTimezone,
  deleteTimezone,
};

TimezonePage.propTypes = {
  timezones: PropTypes.array,
  timezoneTotal: PropTypes.number,
  timezonePageNo: PropTypes.number,
  status: PropTypes.string,
  error: PropTypes.string,
  getTimezones: PropTypes.func,
  createTimezone: PropTypes.func,
  updateTimezone: PropTypes.func,
  deleteTimezone: PropTypes.func,
};

TimezonePage.defaultProps = {
  timezones: [],
  timezoneTotal: 0,
  timezonePageNo: 1,
  status: '',
  error: '',
  getTimezones: null,
  createTimezone: null,
  updateTimezone: null,
  deleteTimezone: null,
};

export default connect(selectors, actions)(TimezonePage);