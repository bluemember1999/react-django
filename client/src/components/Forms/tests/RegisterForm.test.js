import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { updateFormValues } from 'test/helpers';
import RegisterForm from '../RegisterForm';

describe('RegisterForm', () => {
  const formData = {
    first_name: 'john',
    last_name: 'doe',
    email: 'johndoe@gmail.com',
    username: 'johndoe',
  };
  const propsMock = {
    registering: true,
    handleRegister: jest.fn(),
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
        <RegisterForm {...propsMock} />
      </Router>
    );
  });

  it('should render component', () => {
    expect(wrapper.exists('form')).toBeTruthy();
  });

  it('should submit entered data', () => {
    updateFormValues(wrapper, formData, 'register-form');
    wrapper.find('button[type="submit"]').simulate('click');
    expect(propsMock.handleRegister).toHaveBeenCalledWith(formData);
  });
});


