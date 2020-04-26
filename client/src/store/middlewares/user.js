import axios from 'axios';
import  {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import * as ACTIONS from 'store/actions/user';
import { API_BASE_URL } from 'config/base';
import { parseError } from 'utils/error-parser';
import _ from 'lodash';

export function* doGetUsers({ payload }) {
  try {
    const state = yield select();
    const { pageNo, search } = payload;
    const updatedPageNo = pageNo === undefined ? _.get(state, 'user.users.pageNo') : pageNo;
    const updatedSearch = search === undefined ? _.get(state, 'user.search') : search;
    const res = yield call(axios.get, `${API_BASE_URL}/api/user/?page=${updatedPageNo}&search=${updatedSearch}`);

    yield put(ACTIONS.getUsersSuccess({ 
      data: res.data, 
      pageNo: updatedPageNo,
      search: updatedSearch,
    }));
  } catch (error) {
    yield put(ACTIONS.getUsersFailure(parseError(error)));
  }
}

export function* doCreateUser({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/api/user/`, payload);

    yield put(ACTIONS.createUserSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.createUserFailure(parseError(error)));
  }
}

export function* doUpdateUser({ payload }) {
  try {
    const { userId, updatedUser } = payload;
    const res = yield call(axios.patch, `${API_BASE_URL}/api/user/${userId}/`, updatedUser);

    yield put(ACTIONS.updateUserSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.updateUserFailure(parseError(error)));
  }
}

export function* doDeleteUser({ payload }) {
  try {
    const { userId } = payload;
    
    yield call(axios.delete, `${API_BASE_URL}/api/user/${userId}/`);
    yield put(ACTIONS.deleteUserSuccess(userId));
  } catch (error) {
    yield put(ACTIONS.deleteUserFailure(parseError(error)));
  }
}

export function* userSaga() {
  yield takeLatest(ACTIONS.getUsers, doGetUsers);
  yield takeLatest(ACTIONS.createUser, doCreateUser);
  yield takeLatest(ACTIONS.updateUser, doUpdateUser);
  yield takeLatest(ACTIONS.deleteUser, doDeleteUser);
}