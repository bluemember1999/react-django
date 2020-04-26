import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const CustomTable = ({
  columns,
  dataSource,
  pageNo,
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
      current: pageNo,
      defaultPageSize: 10,
      onChange: handlePaginate,
      total,
    }}
    loading={loading}
  />
);

CustomTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  pageNo: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  handlePaginate: PropTypes.func,
  renderHeader: PropTypes.func,
};

CustomTable.defaultProps = {
  columns: [],
  dataSource: [],
  pageNo: 1,
  total: 0,
  loading: false,
  handlePaginate: null,
  renderHeader: null,
};

export default CustomTable;