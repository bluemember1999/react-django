import { pick } from 'lodash';
import { TimezoneMock } from 'test/mocks';
import {
  GET_TIMEZONES,
  CREATE_TIMEZONE,
  UPDATE_TIMEZONE,
  DELETE_TIMEZONE,
} from 'store/constants/timezone';
import { timezoneReducer } from '../timezone';

const initialState = {
  timezones: {
    data: [TimezoneMock(1)],
    pageNo: 1,
    pageSize: 10,
    total: 1,
  },
  status: 'INIT',
  error: null,
};

describe('TimezoneReducer', () => {
  it('should return the initial state', () => {
    expect(timezoneReducer(initialState, {})).toEqual(initialState);
  });

  it('should return fetching state', () => {
    const actionTypes = [
      GET_TIMEZONES.REQUEST,
      CREATE_TIMEZONE.REQUEST,
      UPDATE_TIMEZONE.REQUEST,
      DELETE_TIMEZONE.REQUEST,
    ];

    actionTypes.forEach((type) => {
      const nextState = timezoneReducer(initialState, { type });

      expect(pick(nextState, ['error', 'status'])).toEqual({ error: null, status: type });
    });
  });

  it('should return GET_TIMEZONES success state', () => {
    const type = GET_TIMEZONES.SUCCESS;
    const action = { 
      type, 
      payload: { 
        data: { 
          results: [TimezoneMock(1), TimezoneMock(2)],
          count: 2,
        }, 
        pageNo: 1, 
      } 
    };
    const nextState = timezoneReducer(initialState, action);

    expect(pick(nextState, ['timezones', 'status'])).toEqual({
      timezones: {
        data: action.payload.data.results,
        pageNo: action.payload.pageNo,
        pageSize: 10,
        total: 2,
      },
      status: action.type,
    });
  });

  it('should return CREATE_TIMEZONE success state with different data', () => {
    const type = CREATE_TIMEZONE.SUCCESS;
    const action = { type, payload: TimezoneMock(2) };
    const nextState = timezoneReducer(initialState, action);
  
    expect(pick(nextState, ['timezones', 'status'])).toEqual({
      timezones: {
        data: [TimezoneMock(2), TimezoneMock(1)],
        pageNo: 1,
        pageSize: 10,
        total: 2,
      },
      status: action.type,
    });
  });

  it('should return CREATE_TIMEZONE success state with same data', () => {
    const type = CREATE_TIMEZONE.SUCCESS;
    const action = { type, payload: TimezoneMock(1) };
    const nextState = timezoneReducer(initialState, action);
  
    expect(pick(nextState, ['timezones', 'status'])).toEqual({
      timezones: {
        data: [TimezoneMock(1)],
        pageNo: 1,
        pageSize: 10,
        total: 1,
      },
      status: action.type,
    });
  });

  it('should return UPDATE_TIMEZONE success state', () => {
    const type =  UPDATE_TIMEZONE.SUCCESS;
    const updated = {...TimezoneMock(1), difference_to_GMT: '-1'};
    const action = { type, payload: updated };
    const nextState = timezoneReducer(initialState, action);

    expect(pick(nextState, ['timezones', 'status'])).toEqual({
      timezones: {
        data: [updated],
        pageNo: 1,
        pageSize: 10,
        total: 1,
      },
      status: action.type,
    });
  });

  it('should return DELETE_TIMEZONE success state with existed record', () => {
    const type = DELETE_TIMEZONE.SUCCESS;
    const action = { type, payload: 1 };
    const nextState = timezoneReducer(initialState, action);

    expect(pick(nextState, ['timezones', 'status'])).toEqual({
      timezones: {
        data: [],
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      status: action.type,
    });
  });

  it('should return DELETE_TIMEZONE success state with non-existed record', () => {
    const type = DELETE_TIMEZONE.SUCCESS;
    const action = { type, payload: 2 };
    const nextState = timezoneReducer(initialState, action);

    expect(pick(nextState, ['timezones', 'status'])).toEqual({
      timezones: {
        data: [TimezoneMock(1)],
        pageNo: 1,
        pageSize: 10,
        total: 1,
      },
      status: action.type,
    });
  });

  it('should return fail state', () => {
    const actionTypes = [
      GET_TIMEZONES.FAILURE,
      CREATE_TIMEZONE.FAILURE,
      UPDATE_TIMEZONE.FAILURE,
      DELETE_TIMEZONE.FAILURE,
    ];

    actionTypes.forEach((type) => {
      const action = { type, payload: { message: type } };
      const nextState = timezoneReducer(initialState, action);

      expect(pick(nextState, ['error', 'status'])).toEqual({
        error: action.payload.message,
        status: action.type,
      });
    });
  });
});