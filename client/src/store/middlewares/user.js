import axios from 'axios';
import  {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { API_BASE_URL } from 'config/base';
import { parseError } from 'utils/error-parser';
import * as ACTIONS from 'store/actions/auth';

export function* doGetUsers({ payload }) {
  try {
    const { pageNo } = payload;
    const res = yield call(axios.get, `${API_BASE_URL}/api/user/?page=${pageNo}`);

    yield put(ACTIONS.getUsersSuccess({ data: res.data, pageNo }));
  } catch (error) {
    yield put(ACTIONS.getUsersFailure(parseError(error)));
  }
}

export function* doCreateUser({ payload }) {
  try {
    const res = yield(axios.post, `${API_BASE_URL}/api/user/`, payload);

    yield put(ACTIONS.createUserSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.createUserFailure(parseError(error)));
  }
}

export function* doUpdateUser({ payload }) {
  try {
    const { userId, updatedUser } = payload;
    const res = yield call(axios.put, `${API_BASE_URL}/api/user/${userId}/`, updatedUser);

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