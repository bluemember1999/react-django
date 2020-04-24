import { pick, get } from 'lodash';
import { UserMock } from 'test/mocks';
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from 'store/constants/user';
import { userReducer } from '../user';

const initialState = {
  users: {
    data: [UserMock(1)],
    pageNo: 1,
    pageSize: 10,
  },
  currentUser: null,
  status: 'INIT',
  error: null,
};

describe('UserReducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });

  it('should return fetching state', () => {
    const actionTypes = [
      GET_USERS.REQUEST,
      CREATE_USER.REQUEST,
      UPDATE_USER.REQUEST,
      DELETE_USER.REQUEST,
    ];

    actionTypes.forEach((type) => {
      const nextState = userReducer(initialState, { type });

      expect(pick(nextState, ['error', 'status'])).toEqual({ error: null, status: type });
    });
  });

  it('should return GET_USERS success state', () => {
    const type = GET_USERS.SUCCESS;
    const action = { type, payload: { data: [UserMock(1), UserMock(2)], pageNo: 1 } };
    const nextState = userReducer(initialState, action);

    expect(pick(nextState, ['users', 'status'])).toEqual({
      users: {
        data: action.payload.data,
        pageNo: action.payload.pageNo,
        pageSize: 10,
      },
      status: action.type,
    });
  });

  it('should return CREATE_USER success state', () => {
    const type = CREATE_USER.SUCCESS;
    const action = { type, payload: UserMock(2) };
    const nextState = userReducer(initialState, action);
  
    expect(pick(nextState, ['users', 'currentUser', 'status'])).toEqual({
      users: {
        data: [UserMock(2), UserMock(1)],
        pageNo: 1,
        pageSize: 10,
      },
      status: action.type,
      currentUser: null,
    });
  });

  it('should return UPDATE_USER success state', () => {
    const type =  UPDATE_USER.SUCCESS;
    const updated = {...UserMock(1), role: 'MANAGER'};
    const action = { type, payload: updated };
    const nextState = userReducer(initialState, action);

    expect(pick(nextState, ['users', 'currentUser', 'status'])).toEqual({
      users: {
        data: [updated],
        pageNo: 1,
        pageSize: 10,
      },
      status: action.type,
      currentUser: null,
    });
  });

  it('should return DELETE_USER success state', () => {
    const type = DELETE_USER.SUCCESS;
    const action = { type, payload: 1 };
    const nextState = userReducer(initialState, action);

    expect(pick(nextState, ['users', 'currentUser', 'status'])).toEqual({
      users: {
        data: [],
        pageNo: 1,
        pageSize: 10,
      },
      status: action.type,
      currentUser: null,
    });
  });

  it('should return fail state', () => {
    const actionTypes = [
      GET_USERS.FAILURE,
      CREATE_USER.FAILURE,
      UPDATE_USER.FAILURE,
      DELETE_USER.FAILURE,
    ];

    actionTypes.forEach((type) => {
      const action = { type, payload: { message: type } };
      const nextState = userReducer(initialState, action);

      expect(pick(nextState, ['error', 'status'])).toEqual({
        error: action.payload.message,
        status: action.type,
      });
    });
  });
});