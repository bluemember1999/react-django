import { handleActions, combineActions } from 'redux-actions';
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
  },
  currentUser: null,
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
    const updated = users.map((user) => ({ ...user, key: user.email }));

    return imm(state)
      .set('users.data', updated)
      .set('users.pageNo', payload.pageNo)
      .set('status', type)
      .value();
  },
  [CREATE_USER.SUCCESS]: (state, { payload, type }) => {
    const users = get(state,  'users.data');
    const updated = [{...payload, key: payload.email}, ...users];

    return imm(state)
      .set('users.data', updated)
      .set('currentUser', null)
      .set('status', type)
      .value();
  },
  [UPDATE_USER.SUCCESS]: (state,  { payload, type }) => {
    const users = get(state, 'users.data');
    const updated = [...users];
    const index = updated.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      updated[index] = payload;
    }

    return imm(state)
      .set('users.data', updated)
      .set('currentUser', null)
      .set('status', type)
      .value();
  },
  [DELETE_USER.SUCCESS]: (state,  { payload, type }) => {
    const users = get(state, 'users.data');
    let updated = [...users];
    
    updated = updated.filter((item) => item.id !== payload);

    return imm(state)
      .set('users.data', updated)
      .set('currentUser', null)
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