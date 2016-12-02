import { fromJS } from 'immutable';

import {
  FETCH_CITIES,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR,
  SEARCH_CITY,
  SORT_COL,
} from './constants';

// The initial state
export const initialState = fromJS({
  cities: fromJS({}),
  loading: false,
  error: false,
  search: '',
  sort: fromJS({
    column: 'Id',
    order: false,
  }),
});


function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIES:
      return state
        .set('loading', true)
        .set('error', false);
    case FETCH_CITIES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('cities', fromJS(action.cities));
    case FETCH_CITIES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SEARCH_CITY:
      return state
        .set('search', action.city);
    case SORT_COL:
      return state.getIn(['sort', 'column']) === action.col ?
        state.setIn(['sort', 'order'], !state.getIn(['sort', 'order'])) :
        state.set('sort', fromJS({
          column: action.col,
          order: false,
        }))
    default:
      return state;
  }
}

export default appReducer;
