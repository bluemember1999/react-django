import { get } from 'lodash';
import { UserMock } from 'test/mocks';
import {
  selectUsers,
  selectUserTotal,
  selectUserPageNo,
  selectUserStatus,
  selectUserError,
} from '../user';

const mockState = {
  user: {
    users: {
      data: [UserMock(1), UserMock(2)],
      pageNo: 1,
      pageSize: 10,
      total: 2,
    },
    status: 'INIT',
    error: null,
  },
};

describe('UserSelector', () => {
  it('should return user selectors', () => {
    const { user } = mockState;

    expect(selectUsers(mockState)).toEqual(get(user, 'users.data'));
    expect(selectUserTotal(mockState)).toEqual(get(user, 'users.total'));
    expect(selectUserPageNo(mockState)).toEqual(get(user, 'users.pageNo'));
    expect(selectUserStatus(mockState)).toEqual(get(user, 'status'));
    expect(selectUserError(mockState)).toEqual(get(user, 'error'));
  });
});