import { takeLatest } from 'redux-saga';
import {
  call,
  put,
  fork,
  select,
} from 'redux-saga/effects';


import request from '../../utils/request';
import {
  FETCH_CITIES,
  GEOCODE_CITY,
} from './constants';
import {
  citiesFetched,
  citiesFetchingError,
  cityGeocoded,
  cityGeocodingError,
} from './actions';
import {
  selectCity,
} from './selectors';


export function* getCities() {
  const requestURL = 'http://qbdevinterview.azurewebsites.net/api/citystats';

  try {
    const cities = yield call(request, requestURL);
    yield put(citiesFetched(cities));
  } catch (err) {
    yield put(citiesFetchingError(err));
  }
}

export function* getCityGeocode() {
  const city = yield select(selectCity());
  const requestURL = `https://search.mapzen.com/v1/search?text=${city}&api_key=mapzen-WrR5o29&size=1&boundary.country	=FIN`;

  try {
    const cities = yield call(request, requestURL);
    yield put(cityGeocoded(cities));
  } catch (err) {
    yield put(cityGeocodingError(err));
  }
}

export function* getCitiesWatcher() {
  yield fork(takeLatest, FETCH_CITIES, getCities);
}

export function* getCityGeocodeWatcher() {
  yield fork(takeLatest, GEOCODE_CITY, getCityGeocode);
}

export function* apiSagas() {
  // Fork watcher so we can continue execution
  yield fork(getCitiesWatcher);
  yield fork(getCityGeocodeWatcher);
}

export default [
  apiSagas,
]
