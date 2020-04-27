import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { Button } from 'antd';
import SubmitButton from '../SubmitButton';

describe('SubmitButton', () => {
  it('should render component', () => {
    const propsMock = {
      loading: true,
      name: 'LogIn',
    };
    const wrapper = mount(
      <Router>
        <SubmitButton {...propsMock}/>
      </Router>
    );

    expect(wrapper.exists(Button)).toBeTruthy();
    expect(wrapper.find(Button).prop('type')).toEqual('primary');
    expect(wrapper.find(Button).prop('htmlType')).toEqual('submit');
    expect(wrapper.find(Button).prop('loading')).toBeTruthy();
    expect(wrapper.find(Button).children().text()).toEqual('LogIn');
  });
});