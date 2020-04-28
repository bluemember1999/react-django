import React from 'react';
import { mount } from 'enzyme';
import { Alert } from 'antd';
import { GET_USERS } from 'store/constants/user';
import {
  CustomTable,
  UserModal,
} from 'components';
import { UserPage } from './index';

describe('TimezonePage', () => {
  const propsMock = {
    getUsers: jest.fn(),
  };
  let wrapper;

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    wrapper = mount(
      <UserPage {...propsMock} />
    );
  });

  it('should render component', () => {
    expect(wrapper.exists(CustomTable)).toBeTruthy();
  });

  it('should show error message', () => {
    const error = "error";

    wrapper.setProps({ status: GET_USERS.FAILURE, error });
    expect(wrapper.find(Alert).length).toBe(1);
    expect(wrapper.find(Alert).children().text()).toEqual(error);
  });

  it('should show TIMEZONE modal', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.exists(UserModal)).toBeTruthy();
  });
});