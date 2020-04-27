import React from 'react';
import { mount } from 'enzyme';
import { TimezoneMock } from 'test/mocks';
import TimezoneModal from '../TimezoneModal';

describe('TimezoneModal', () => {
  const propsMock = {
    isVisible: true,
    currentTimezone: TimezoneMock(1),
    handleClose: jest.fn(),
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
      <TimezoneModal {...propsMock} />
    );
  });

  it('should render component', () => {
    expect(wrapper.exists('form')).toBeTruthy();
    wrapper = mount(
      <TimezoneModal 
        {...propsMock} 
        isVisible={false}
      />
    );
    expect(wrapper.exists('form')).toBeFalsy();
  });

  it('should close modal', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.exists('form')).toBeFalsy();
  })

  it('should submit entered data', () => {  
    wrapper.find('button').at(2).simulate('click');
    expect(propsMock.handleSave).toHaveBeenCalledWith(TimezoneMock(1));
  });
})