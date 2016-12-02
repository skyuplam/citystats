import {
  FETCH_CITIES,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR,
  SEARCH_CITY,
  SORT_COL,
  GEOCODE_CITY,
  GEOCODE_CITY_SUCCESS,
  GEOCODE_CITY_ERROR,
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

export function geocodeCity(city) {
  return {
    type: GEOCODE_CITY,
    city
  };
}

export function cityGeocoded(geocode) {
  return {
    type: GEOCODE_CITY_SUCCESS,
    geocode,
  };
}

export function cityGeocodingError(error) {
  return {
    type: GEOCODE_CITY_ERROR,
    error,
  };
}
