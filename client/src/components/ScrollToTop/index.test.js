import React from 'react';
import { mount } from 'enzyme';
import { ScrollToTop } from './index';

const initialProps = {
  location: {
    search: '',
  },
};

describe('ScrllToTop', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ScrollToTop {...initialProps}>
        <div>Content</div>
      </ScrollToTop>
    );
  });

  it('should render component', () => {
    expect(wrapper.text()).toEqual('Content');
  });

  it('should scroll', () => {
    global.scrollTo = jest.fn();
    wrapper.setProps({ location: { search: 'qs' } });
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});