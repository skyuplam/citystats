import {
  FETCH_CITIES,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR,
  SEARCH_CITY,
  SORT_COL,
} from './constants';

export function fetchCities() {
  return {
    type: FETCH_CITIES,
  }
}

export function citiesFetched(cities) {
  return {
    type: FETCH_CITIES_SUCCESS,
    cities,
  };
}


export function citiesFetchingError(error) {
  return {
    type: FETCH_CITIES_ERROR,
    error,
  };
}

export function searchCity(city) {
  return {
    type: SEARCH_CITY,
    city,
  };
}

export function sortCol(col) {
  return {
    type: SORT_COL,
    col,
  };
}
