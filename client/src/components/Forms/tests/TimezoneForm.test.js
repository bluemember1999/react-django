import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { TimezoneMock } from 'test/mocks';
import { getInputValue } from 'test/helpers';
import TimezoneForm from '../TimezoneForm';

describe('TimezoneForm', () => {
  const propsMock = {
    currentTimezone: TimezoneMock(1),
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
      <Router>
        <TimezoneForm {...propsMock} />
      </Router>
    );
  });

  it('should render component', () => {
    expect(wrapper.exists('form')).toBeTruthy();
  });

  it('should check default text', () => {
    expect(getInputValue(wrapper, 'timezone-form', 'name')).toEqual(TimezoneMock(1).name);
    expect(getInputValue(wrapper, 'timezone-form', 'name_of_city')).toEqual(TimezoneMock(1).name_of_city);
    expect(getInputValue(wrapper, 'timezone-form', 'difference_to_GMT')).toEqual(TimezoneMock(1).difference_to_GMT);
  });
});