import React from 'react';
import { shallow } from 'enzyme';
import {
  Alert,
  Container,
  Card,
  CardBody,
  Jumbotron,
} from 'reactstrap';
import { RegisterForm } from 'components';
import { REGISTER } from 'store/constants/auth';
import { RegisterPage } from './index';

const initialProps = {
  loggedIn: false,
  status: 'INIT',
  error: null,
  register: jest.fn(),
};

describe('LoginPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RegisterPage {...initialProps} />);
  });

  it('should render component', () => {
    expect(wrapper.find(Container).length).toBe(1);
    expect(wrapper.find(Jumbotron).length).toBe(1);
    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find(CardBody).length).toBe(1);
    expect(wrapper.find(RegisterForm).length).toBe(1);
  });

  it('should show error alert', () => {
    const error = 'error';

    wrapper.setProps({ status: REGISTER.FAILURE, error });
    expect(wrapper.find(Alert).length).toBe(1);
    expect(wrapper.find(Alert).children().text()).toEqual(error);
  });

  it('should change regiser form props', () => {
    wrapper.setProps({ status: REGISTER.REQUEST });
    expect(wrapper.find(RegisterForm).prop('registering')).toBeTruthy();
  });

  it('should submit register form data', () => {
    wrapper
      .find(RegisterForm)
      .props()
      .handleValidSubmit();
    expect(initialProps.register).toHaveBeenCalledTimes(1);
  });
});