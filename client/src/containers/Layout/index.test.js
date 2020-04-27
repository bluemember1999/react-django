import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { CustomLayout } from './index';

describe('Layout', () => {
  const propsMock = {
    isAdmin: false,
    isManager: false,
    isUser: true,
    children: null,
    location: { pathname: '/timezone' },
    getUsers: jest.fn(),
    getTimezones: jest.fn(),
    logout: jest.fn(),
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
      <Router>
        <CustomLayout {...propsMock} />
      </Router>
    );
  });

  it('should render component', () => {
    expect(wrapper.find(CustomLayout)).toBeTruthy();
  });

  it('should only go timezone', () => {
    wrapper.setProps({ isAdmin: false, isManager: false, isUser: true });
    expect(wrapper.find('a[children="Timezone"]')).toBeTruthy();
  });

  it('should only go user', () => {
    wrapper.setProps({ isAdmin: false, isManager: true, isUser: false });
    expect(wrapper.find('a[children="User"]')).toBeTruthy();
  });

  it('should go both timezone and user', () => {
    wrapper.setProps({ isAdmin: true, isManager: false, isUser: false });
    expect(wrapper.find('a[children="Timezone"]')).toBeTruthy();
    expect(wrapper.find('a[children="User"]')).toBeTruthy();
  });
});