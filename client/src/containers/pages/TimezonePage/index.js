import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTimezones,
  selectTimezoneTotal,
} from 'store/selectors/timezone';
import {
  getTimezones,
  createTimezone,
  updateTimezone,
  deleteTimezone,
} from 'store/actions/timezone';
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
  AppstoreAddOutlined,
} from '@ant-design/icons';
import {
  CustomTable,
  TimezoneModal,
} from 'components';

const { Content } = Layout;

class UserPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      columns: [
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
      currentTimezone: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    const { getTimezones } = this.props;

    getTimezones({
      pageNo: 1,
    });
  }

  handleCreate = () => {
    this.setState({
      currentTimezone: {},
      isVisible: true,
    });
  }

  handleDelete = (key) => {
    const { timezones, deleteTimezone } = this.props;
    const index = timezones.findIndex((timezone) => timezone.key === key);
  
    deleteTimezone({
      timezoneId: timezones[index].id,
    });
  }

  handleEdit = (key) => {
    const { timezones } = this.props;
    const index = timezones.findIndex((timezone)=> timezone.key === key);
    
    this.setState({
      currentTimezone: timezones[index],
      isVisible: true,
    });
  }

  handlePaginate = (page, pageSize) => {
    const { getTimezones } = this.props;

    console.log(page);
    getTimezones({
      pageNo: page,
    });
  }

  handleSave = (values) => {
    const { createTimezone, updateTimezone } = this.props;
    const { currentTimezone } = this.state;

    if (Object.keys(currentTimezone).length === 0) {
      createTimezone(values);
    } else {
      updateTimezone({
        timezoneId: currentTimezone.id,
        updatedTimezone: values,
      });
    }
  }
  
  handleToggle = () => {
    this.setState({
      isVisible: false,
    });
  }

  renderHeader = () => (
    <Row type="flex" justify="space-between">
      <Col>
        Timezone Management
      </Col>
      <Col>
        <Button 
          icon={<AppstoreAddOutlined />} 
          onClick={this.handleCreate}
        />
      </Col>
    </Row>
  );

  render() {
    const {
      timezones,
      timezoneTotal,
    } = this.props;
    const {
      currentTimezone,
      columns,
      isVisible,
    } = this.state;
    
    return (
      <Layout>
        <Content>
          <CustomTable
            columns={columns}
            dataSource={timezones}
            total={timezoneTotal}
            handlePaginate={this.handlePaginate}
            renderHeader={this.renderHeader}
          />
        </Content>  
        <TimezoneModal
          isVisible={isVisible}
          currentTimezone={currentTimezone}
          handleToggle={this.handleToggle}
          handleSubmit={this.handleSave}
        />
      </Layout>
    );
  }
}

const selectors = createStructuredSelector({
  timezones: selectTimezones,
  timezoneTotal: selectTimezoneTotal,
});
const actions = {
  getTimezones,
  createTimezone,
  updateTimezone,
  deleteTimezone,
};

export default connect(selectors, actions)(UserPage);