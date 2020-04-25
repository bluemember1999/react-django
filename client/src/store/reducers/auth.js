import { handleActions, combineActions } from 'redux-actions';
import { get } from 'lodash';
import { wrap as imm } from 'object-path-immutable';
import { 
  getAuthData,
  clearAuthData,
} from 'utils/storage';
import {
  LOGIN,
  REGISTER,
  LOGOUT,
} from 'store/constants/auth';

const initialState = {
  user: get(getAuthData(), 'user', null),
  status: 'INIT',
  error: null,
};

export const authReducer = handleActions({
  [combineActions(
    LOGIN.REQUEST,
    REGISTER.REQUEST,
  )]: (state, { type }) => {
    return imm(state)
      .set('error', null)
      .set('status', type)
      .value();
  },
  [combineActions(
    LOGIN.SUCCESS,
    REGISTER.SUCCESS,
  )]: (state, { payload, type }) => {
    return imm(state)
      .set('user', payload.user)
      .set('status', type)
      .value();
  },
  [combineActions(
    LOGIN.FAILURE,
    REGISTER.FAILURE,
  )]: (state, { payload, type }) => {
    return imm(state)
      .set('error', payload.message)
      .set('status', type)
      .value();
  },
  [LOGOUT]: (state, { type }) => {
    clearAuthData();
    return imm(state)
      .set('user', null)
      .set('status', type)
      .value();
  },
}, initialState);