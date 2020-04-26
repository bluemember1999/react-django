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
      total,
      handlePaginate,
    } = this.props;

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        title={renderHeader}
        pagination={{ 
          defaultPageSize: 10,
          total: total,
          onChange: handlePaginate,
        }}
      />
    );
  }
}

export default CustomTable;