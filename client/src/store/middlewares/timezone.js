import axios from 'axios';
import  {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import * as ACTIONS from 'store/actions/timezone';
import { API_BASE_URL } from 'config/base';
import { parseError } from 'utils/error-parser';
import _ from 'lodash';

export function* doGetTimezones({ payload }) {
  try {
    const state = yield select();
    const { pageNo, search } = payload;
    const updatedPageNo = pageNo === undefined ? _.get(state, 'timezone.timezones.pageNo') : pageNo;
    const updatedSearch = search === undefined ? _.get(state, 'timezone.search') : search;
    const res = yield call(axios.get, `${API_BASE_URL}/api/timezone/?page=${updatedPageNo}&search=${updatedSearch}`);

    yield put(ACTIONS.getTimezonesSuccess({
      data: res.data, 
      pageNo: updatedPageNo,
      search: updatedSearch,
    }));
  } catch (error) {
    yield put(ACTIONS.getTimezonesFailure(parseError(error)));
  }
}

export function* doCreateTimezone({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/timezone/`, payload);

    yield put(ACTIONS.createTimezoneSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.createTimezoneFailure(parseError(error)));
  }
}

export function* doUpdateTimezone({ payload }) {
  try {
    const { timezoneId, updatedTimezone } = payload;
    const res = yield call(axios.put, `${API_BASE_URL}/api/timezone/${timezoneId}/`, updatedTimezone);

    yield put(ACTIONS.updateTimezoneSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.updateTimezoneFailure(parseError(error)));
  }
}

export function* doDeleteTimezone({ payload }) {
  try {
    const { timezoneId } = payload;
    
    yield call(axios.delete, `${API_BASE_URL}/api/timezone/${timezoneId}/`);
    yield put(ACTIONS.deleteTimezoneSuccess(timezoneId));
  } catch (error) {
    yield put(ACTIONS.deleteTimezoneFailure(parseError(error)));
  }
}

export function* timezoneSaga() {
  yield takeLatest(ACTIONS.getTimezones, doGetTimezones);
  yield takeLatest(ACTIONS.createTimezone, doCreateTimezone);
  yield takeLatest(ACTIONS.updateTimezone, doUpdateTimezone);
  yield takeLatest(ACTIONS.deleteTimezone, doDeleteTimezone);
}