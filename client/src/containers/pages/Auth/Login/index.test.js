import React from 'react';
import { shallow } from 'enzyme';
import {
  Alert,
  Container,
  Card,
  CardBody,
  Jumbotron,
} from 'reactstrap';
import { LoginForm } from 'components';
import { LOGIN } from 'store/constants/auth';
import { LoginPage } from './index';

const initialProps = {
  loggedIn: false,
  status: 'INIT',
  error: null,
  logIn: jest.fn(),
};

describe('LoginPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginPage {...initialProps} />);
  });

  it('should render component', () => {
    expect(wrapper.find(Container).length).toBe(1);
    expect(wrapper.find(Jumbotron).length).toBe(1);
    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find(CardBody).length).toBe(1);
    expect(wrapper.find(LoginForm).length).toBe(1);
  });

  it('should show error alert', () => {
    const error = 'error';

    wrapper.setProps({ status: LOGIN.FAILURE, error });
    expect(wrapper.find(Alert).length).toBe(1);
    expect(wrapper.find(Alert).children().text()).toEqual(error);
  });

  it('should change login form props', () => {
    wrapper.setProps({ status: LOGIN.REQUEST });
    expect(wrapper.find(LoginForm).prop('loggingIn')).toBeTruthy();
  });

  it('should submit login form data', () => {
    wrapper
      .find(LoginForm)
      .props()
      .handleValidSubmit();
    expect(initialProps.logIn).toHaveBeenCalledTimes(1);
  });
});