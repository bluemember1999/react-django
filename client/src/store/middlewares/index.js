import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userSaga } from './user';
import { timezoneSaga } from './timezone';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    timezoneSaga(),
  ]);
};