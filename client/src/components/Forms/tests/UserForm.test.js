import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { UserMock } from 'test/mocks';
import { getInputValue } from 'test/helpers';
import UserForm from '../UserForm';

describe('UserForm', () => {
  const propsMock = {
    isAdmin: false,
    currentUser: UserMock(1),
    handleSave: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
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
        <UserForm {...propsMock} />
      </Router>
    );
  });

  it('should render component', () => {
    expect(wrapper.exists('form')).toBeTruthy();
  });

  it('should check default text', () => {
    expect(getInputValue(wrapper, 'user-form', 'first_name')).toEqual(UserMock(1).first_name);
    expect(getInputValue(wrapper, 'user-form', 'last_name')).toEqual(UserMock(1).last_name);
    expect(getInputValue(wrapper, 'user-form', 'username')).toEqual(UserMock(1).username);
    expect(getInputValue(wrapper, 'user-form', 'email')).toEqual(UserMock(1).email);
  });
});