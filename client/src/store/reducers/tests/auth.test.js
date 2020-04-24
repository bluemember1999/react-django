import { pick } from 'lodash';
import { UserMock } from 'test/mocks';
import {
  LOGIN,
  REGISTER,
} from 'store/constants/auth';
import { authReducer } from '../auth';

const initialState = {
  user: null,
  status: 'INIT',
  error: null,
};

describe('AuthReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });

  it('should return fetching state', () => {
    const actionTypes = [
      LOGIN.REQUEST,
      REGISTER.REQUEST,
    ];

    actionTypes.forEach((type) => {
      const nextState = authReducer(initialState, { type });

      expect(pick(nextState, ['error', 'status'])).toEqual({ error: null, status: type });
    });
  });

  it('should return success state', () => {
    const actionTypes = [
      LOGIN.SUCCESS,
      REGISTER.SUCCESS,
    ];

    actionTypes.forEach((type) => {
      const action = { type, payload: { user: UserMock() } };
      const nextState = authReducer(initialState, action);

      expect(pick(nextState, ['user', 'status'])).toEqual({
        user: action.payload.user,
        status: action.type,
      });
    });
  });

  it('should return fail state', () => {
    const actionTypes = [
      LOGIN.FAILURE,
      REGISTER.FAILURE,
    ];

    actionTypes.forEach((type) => {
      const action = { type, payload: { message: type } };
      const nextState = authReducer(initialState, action);

      expect(pick(nextState, ['error', 'status'])).toEqual({
        error: action.payload.message,
        status: action.type,
      });
    });
  });
});