import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { updateFormValues } from 'test/helpers';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const formData = {
    email: 'johndoe@gmail.com',
    password: 'admin',
  };
  const propsMock = {
    loggingIn: true,
    handleLogin: jest.fn(),
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
        <LoginForm {...propsMock} />
      </Router>
    );
  });

  it('should render component', () => {
    expect(wrapper.exists('form')).toBeTruthy();
  });

  it('should submit entered data', () => {  
    updateFormValues(wrapper, formData, 'login-form');
    wrapper.find('button[type="submit"]').simulate('click');
    expect(propsMock.handleLogin).toHaveBeenCalledWith(formData);
  });
});


