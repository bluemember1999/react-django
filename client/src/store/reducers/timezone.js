import { 
  handleActions, 
  combineActions,
} from 'redux-actions';
import { get } from 'lodash';
import { wrap as imm } from 'object-path-immutable';
import {
  GET_TIMEZONES,
  CREATE_TIMEZONE,
  UPDATE_TIMEZONE,
  DELETE_TIMEZONE,
} from 'store/constants/timezone';

const initialState = {
  timezones: {
    data: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
  search: '',
  status: 'INIT',
  error: null,
};

export const timezoneReducer = handleActions({
  [combineActions(
    GET_TIMEZONES.REQUEST,
    CREATE_TIMEZONE.REQUEST,
    UPDATE_TIMEZONE.REQUEST,
    DELETE_TIMEZONE.REQUEST,
  )]: (state, { type }) => {
    return imm(state)
      .set('error', null)
      .set('status', type)
      .value();
  },
  [GET_TIMEZONES.SUCCESS]: (state, { payload, type }) => {
    const timezones = payload.data.results;
    const updated = timezones.map((timezone) => ({ ...timezone, key: timezone.id }));

    return imm(state)
      .set('timezones.data', updated)
      .set('timezones.pageNo', payload.pageNo)
      .set('timezones.search', payload.search)
      .set('timezones.total', payload.data.count)
      .set('search', payload.search)
      .set('status', type)
      .value();
  },
  [CREATE_TIMEZONE.SUCCESS]: (state, { payload, type }) => {
    const timezones = get(state,  'timezones.data');
    const total = get(state, 'timezones.total');
    const isExisted = timezones.findIndex((timezone) => timezone.id === payload.id) >= 0;
    const updated = isExisted === false ? 
      [{ ...payload, key: payload.id }, ...timezones] : [...timezones];
    const updatedTotal = isExisted === false ? total + 1 : total;

    return imm(state)
      .set('timezones.data', updated)
      .set('timezones.total', updatedTotal)
      .set('status', type)
      .value();
  },
  [UPDATE_TIMEZONE.SUCCESS]: (state,  { payload, type }) => {
    const timezones = get(state, 'timezones.data');
    const updated = [...timezones];
    const index = updated.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      updated[index] = { ...payload, key: payload.id };
    }

    return imm(state)
      .set('timezones.data', updated)
      .set('status', type)
      .value();
  },
  [DELETE_TIMEZONE.SUCCESS]: (state,  { payload, type }) => {
    const timezones = get(state, 'timezones.data');
    const total = get(state, 'timezones.total');
    const updated = [...timezones].filter((item) => item.id !== payload);
    const updatedTotal = total - (timezones.length - updated.length);

    return imm(state)
      .set('timezones.data', updated)
      .set('timezones.total', updatedTotal)
      .set('status', type)
      .value();
  },
  [combineActions(
    GET_TIMEZONES.FAILURE,
    CREATE_TIMEZONE.FAILURE,
    UPDATE_TIMEZONE.FAILURE,
    DELETE_TIMEZONE.FAILURE,
  )]: (state, { payload, type }) => {
    return imm(state)
      .set('error', payload.message)
      .set('status', type)
      .value();
  },
}, initialState);