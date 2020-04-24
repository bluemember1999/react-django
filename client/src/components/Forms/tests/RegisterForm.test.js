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

  it('should render component', () => {
    const submitMock = jest.fn();
    const wrapper = mount(
      <Router>
        <RegisterForm handleValidSubmit={submitMock} />
      </Router>
    );

    expect(wrapper.exists('form')).toBeTruthy();
  });

  it('should submit entered data', () => {
    const submitMock = jest.fn();
    const wrapper = mount(
      <Router>
        <RegisterForm handleValidSubmit={submitMock} />
      </Router>
    );

    updateFormValues(wrapper, formData);
    wrapper.find('form').simulate('submit');
    expect(submitMock).toHaveBeenCalledWith(formData);
  });
});


