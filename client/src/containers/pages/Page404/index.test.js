import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import Page404 from './index';

describe('Page404', () => {
  it('should render component', () => {
    const wrapper = shallow(<Page404 />);

    expect(wrapper.find(Link).length).toBe(1);
  });
});