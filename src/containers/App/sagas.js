import { takeLatest } from 'redux-saga';
import {
  call,
  put,
  fork,
} from 'redux-saga/effects';


import request from '../../utils/request';
import {
  FETCH_CITIES,
} from './constants';
import {
  citiesFetched,
  citiesFetchingError,
} from './actions';


export function* getCities() {
  const requestURL = 'http://qbdevinterview.azurewebsites.net/api/citystats';

  try {
    const cities = yield call(request, requestURL);
    yield put(citiesFetched(cities));
  } catch (err) {
    yield put(citiesFetchingError(err));
  }
}

export function* getCitiesWatcher() {
  yield fork(takeLatest, FETCH_CITIES, getCities);
}

export function* apiSagas() {
  // Fork watcher so we can continue execution
  yield fork(getCitiesWatcher);
}

export default [
  apiSagas,
]
