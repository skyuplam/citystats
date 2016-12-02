import { createSelector } from 'reselect';
import {
  filter,
  orderBy,
  toLower,
} from 'lodash';

const selectGlobal = () => (state) => state.get('global');

const selectCol = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('sort').toJS(),
);

const selectSearch = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('search'),
);

const selectCities = () => createSelector(
  selectGlobal(),
  selectCol(),
  selectSearch(),
  (globalState, sort, search) => orderBy(
    filter(globalState.get('cities').toJS(), (c) => {
      if (!search) return true;
      return toLower(c.City) === toLower(search);
    }),
    sort.column,
    sort.order ? 'asc' : 'desc'),
);

const selectCity = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('city'),
);

const selectGeocode = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('geocode').toJS(),
);

export {
  selectGlobal,
  selectCol,
  selectSearch,
  selectCities,
  selectCity,
  selectGeocode,
};
