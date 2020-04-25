import React, { Component } from 'react';
import {
  Table,
} from 'antd';

class CustomTable extends Component {
  render() {
    const {
      columns,
      dataSource,
      renderHeader,
    } = this.props;

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        title={renderHeader}
      />
    );
  }
}

export default CustomTable;