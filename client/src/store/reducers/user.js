import {
  handleActions,
  combineActions,
} from 'redux-actions';
import { get } from 'lodash';
import { wrap as imm } from 'object-path-immutable';
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from 'store/constants/user';

const initialState = {
  users: {
    data: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
  status: 'INIT',
  error: null,
};

export const userReducer = handleActions({
  [combineActions(
    GET_USERS.REQUEST,
    CREATE_USER.REQUEST,
    UPDATE_USER.REQUEST,
    DELETE_USER.REQUEST,
  )]: (state, { type }) => {
    return imm(state)
      .set('error', null)
      .set('status', type)
      .value();
  },
  [GET_USERS.SUCCESS]: (state, { payload, type }) => {
    const users = payload.data.results;
    const updated = users.map((user) => ({ ...user, key: user.id }));

    return imm(state)
      .set('users.data', updated)
      .set('users.pageNo', payload.pageNo)
      .set('users.total', payload.data.count)
      .set('status', type)
      .value();
  },
  [CREATE_USER.SUCCESS]: (state, { payload, type }) => {
    const users = get(state,  'users.data');
    const total = get(state, 'users.total');
    const isExisted = users.findIndex((user) => user.id === payload.id) >= 0;
    const updated = isExisted === false ? 
      [{ ...payload, key: payload.id }, ...users] : [...users];
    const updatedTotal = isExisted === false ? total + 1 : total;

    return imm(state)
      .set('users.data', updated)
      .set('users.total', updatedTotal)
      .set('status', type)
      .value();
  },
  [UPDATE_USER.SUCCESS]: (state,  { payload, type }) => {
    const users = get(state, 'users.data');
    const updated = [...users];
    const index = updated.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      updated[index] = { ...payload, key: payload.id };
    }

    return imm(state)
      .set('users.data', updated)
      .set('status', type)
      .value();
  },
  [DELETE_USER.SUCCESS]: (state,  { payload, type }) => {
    const users = get(state, 'users.data');
    const total = get(state, 'users.total');
    let updated = [...users];
    let updatedTotal;
    
    updated = updated.filter((item) => item.id !== payload);
    updatedTotal = total - (users.length - updated.length);

    return imm(state)
      .set('users.data', updated)
      .set('users.total', updatedTotal)
      .set('status', type)
      .value();
  },
  [combineActions(
    GET_USERS.FAILURE,
    CREATE_USER.FAILURE,
    UPDATE_USER.FAILURE,
    DELETE_USER.FAILURE,
  )]: (state, { payload, type }) => {
    return imm(state)
      .set('error', payload.message)
      .set('status', type)
      .value();
  },
}, initialState);