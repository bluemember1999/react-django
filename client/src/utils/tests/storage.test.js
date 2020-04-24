import { AUTH_DATA } from 'config/base';
import {
  setItem,
  getItem,
  removeItem,
  getAuthData,
  setAuthData,
} from "../storage";

describe('Storage Helpers', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    localStorage.setItem.mockRestore();
    localStorage.getItem.mockRestore();
    localStorage.removeItem.mockRestore();
  });

  it('setItem', () => {
    setItem('token', 'token');
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token');
  });

  it('getItem', () => {
    getItem('token');
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('removeItem', () => {
    removeItem('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('getAuthData', () => {
    const data = { token: 'token' };

    expect(getAuthData()).toBeNull();
    setAuthData(data);
    expect(getAuthData()).toEqual(data);
  });

  it('setAuthData', () => {
    const data = { token: 'token' };
    setAuthData(data);
    expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_DATA, JSON.stringify(data));
  });

  it('clearAuthData', () => {
    removeItem(AUTH_DATA);
    expect(localStorage.removeItem).toHaveBeenCalledWith(AUTH_DATA);
  });
});