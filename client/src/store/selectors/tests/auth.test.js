import update from 'immutability-helper';
import { UserMock } from 'test/mocks';
import {
  selectLoggedIn,
  selectAuthStatus,
  selectAuthError,
  selectIsAdmin,
  selectIsManager,
  selectIsUser,
} from '../auth';

const mockState = {
  auth: {
    user: UserMock(),
    status: 'INIT',
    error: null,
  },
};

describe('AuthSelector', () => {
  it('should return auth selectors', () => {
    const { auth } = mockState;

    expect(selectLoggedIn(mockState)).toEqual(!!auth.user);
    expect(selectAuthStatus(mockState)).toEqual(auth.status);
    expect(selectAuthError(mockState)).toEqual(auth.error);
  });

  it('should return auth roles', () => {
    let state = mockState;

    expect(selectIsUser(state)).toEqual(true);
  
    state = update(state, {
      auth: {
        user: {
          role: { $set: 'ADMIN' },
        },
      },
    });
    expect(selectIsAdmin(state)).toEqual(true);

    state = update(state, {
      auth: {
        user: {
          role: { $set: 'MANAGER' },
        },
      },
    });
    expect(selectIsManager(state)).toEqual(true);
  });
});