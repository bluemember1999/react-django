import { handleActions, combineActions } from 'redux-actions';
import { get } from 'lodash';
import { getAuthData, } from 'utils/storage';
import {
  LOGIN,
  REGISTER,
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
  )]: (state, { type }) => ({ ...state, error: null, status: type }),
  [combineActions(
    LOGIN.SUCCESS,
    REGISTER.SUCCESS,
  )]: (state, { payload, type }) => ({ ...state, user: payload.user, status: type }),
  [combineActions(
    LOGIN.FAILURE,
    REGISTER.FAILURE,
  )]: (state, { payload, type }) => ({ ...state, error: payload.message, status: type }),
}, initialState);