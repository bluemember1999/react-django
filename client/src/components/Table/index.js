import React from 'react';
import { Table } from 'antd';

const CustomTable = ({
  columns,
  dataSource,
  total,
  loading,
  handlePaginate,
  renderHeader,
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    title={renderHeader}
    pagination={{ 
      defaultPageSize: 10,
      total: total,
      onChange: handlePaginate,
    }}
    loading={loading}
  />
);

export default CustomTable;