import { get } from 'lodash';
import { UserMock } from 'test/mocks';
import {
  selectUsers,
  selectCurrentUser,
  selectUserStatus,
  selectUserError,
} from '../user';

const mockState = {
  user: {
    users: {
      data: [UserMock(1), UserMock(2)],
      pageNo: 1,
      pageSize: 10,
    },
    currentUser: UserMock(1),
    status: 'INIT',
    error: null,
  },
};

describe('UserSelector', () => {
  it('should return user selectors', () => {
    const { user } = mockState;

    expect(selectUsers(mockState)).toEqual(get(user, 'users.data'));
    expect(selectCurrentUser(mockState)).toEqual(user.currentUser);
    expect(selectUserStatus(mockState)).toEqual(user.status);
    expect(selectUserError(mockState)).toEqual(user.error);
  });
});