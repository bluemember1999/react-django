import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'antd';
import CustomTable from './index';

describe('CustomTable', () => {
  const propsMock = {
    columns: [],
    dataSource: [],
    pageNo: 1,
    total: 0,
    loading: false,
    handlePaginate: jest.fn(),
    renderHeader: jest.fn(),
  };
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <CustomTable {...propsMock} />
    );
  });

  it('should render component', () => {
    expect(wrapper.find(Table)).toBeTruthy();
  });
});