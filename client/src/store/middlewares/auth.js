import axios from 'axios';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { API_BASE_URL } from 'config/base';
import { setAuthData } from 'utils/storage';
import { parseError } from 'utils/error-parser';
import * as ACTIONS from 'store/actions/auth';

export function* doLogIn({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/login/`, payload);

    setAuthData(res.data);
    yield put(ACTIONS.logInSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.logInFailure(parseError(error)));
  }
};

export function* doRegister({ payload }) {
  try {
    const res = yield call(axios.post, `${API_BASE_URL}/auth/register/`, payload);

    setAuthData(res.data);
    yield put(ACTIONS.registerSuccess(res.data));
  } catch (error) {
    yield put(ACTIONS.registerFailure(parseError(error)));
  }
};

export function* authSaga() {
  yield takeLatest(ACTIONS.logIn, doLogIn);
  yield takeLatest(ACTIONS.register, doRegister);
};