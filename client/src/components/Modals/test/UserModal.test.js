import React from 'react';
import { mount } from 'enzyme';
import { UserMock } from 'test/mocks';
import UserModal from '../UserModal';

describe('UserModal', () => {
  let handleSave = jest.fn();
  const propsMock = {
    isVisible: true,
    isAdmin: false,
    currentUser: UserMock(1),
    handleClose: jest.fn(),
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
      <UserModal {...propsMock} handleSave={handleSave} />
    );
  });

  it('should render component', () => {
    expect(wrapper.exists('form')).toBeTruthy();
    wrapper = mount(
      <UserModal 
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
    console.log(wrapper.find('button[type="submit"]').props());
    wrapper.find('button[type="submit"]').simulate('click');
    expect(handleSave).toHaveBeenCalledWith(UserMock(1));
  });
})