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

  it('should render component', () => {
    const submitMock = jest.fn();
    const wrapper = mount(
      <Router>
        <LoginForm handleValidSubmit={submitMock} />
      </Router>
    );

    expect(wrapper.exists('form')).toBeTruthy();
  });

  it('should submit entered data', () => {
    const submitMock = jest.fn();
    const wrapper = mount(
      <Router>
        <LoginForm handleValidSubmit={submitMock} />
      </Router>
    );

    updateFormValues(wrapper, formData);
    wrapper.find('form').simulate('submit');
    expect(submitMock).toHaveBeenCalledWith(formData);
  });
});


