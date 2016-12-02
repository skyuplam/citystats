import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Map,
  Marker,
  TileLayer,
} from 'react-leaflet';
import L from 'leaflet';
import {
  isEmpty,
  head,
  keys,
} from 'lodash';

import {
  selectCities,
  selectGeocode,
} from './selectors';

import {
  fetchCities,
  searchCity,
  sortCol,
  geocodeCity,
} from './actions';
import './App.css';


export class App extends Component {
  constructor(props) {
    super();
    const {
      onLoadComponent,
    } = props;

    onLoadComponent();
  }

  render() {
    const {
      cities,
      onClickColumn,
      onSearch,
      onClickCity,
      geocode,
    } = this.props;

    const parsedGeo = isEmpty(geocode) ? null : L.GeoJSON.coordsToLatLng(geocode.features[0].geometry.coordinates);

    return (
      <div className="App">
        <div
          className="data"
        >
          Search <input onChange={onSearch}/>
          {
            isEmpty(cities) ? null :
            <table
              className="data-table"
            >
              <thead>
                <tr>
                  {keys(head(cities)).map((k) => (
                    <th
                      key={k}
                      onClick={() => onClickColumn(k)}
                    >
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cities.map((c) => (
                  <tr
                    key={`TR${c.Id}`}
                  >
                    {keys(c).map((o) => (
                      <td
                        key={`TD${o}`}
                        onClick={() =>
                          o === 'City' ? onClickCity(c[o]) : null
                        }
                      >
                        {c[o]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
        {
          isEmpty(geocode) ? null :
          <Map
            center={parsedGeo}
            zoom={13}
          >
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={parsedGeo}
            />
          </Map>
        }
      </div>
    );
  }
}

App.propTypes = {
  onLoadComponent: React.PropTypes.func,
  onClickColumn: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadComponent: () => dispatch(fetchCities()),
    onClickColumn: (col) => dispatch(sortCol(col)),
    onSearch: (evt) => {
      dispatch(searchCity(evt.target.value));
    },
    onClickCity: (city) => dispatch(geocodeCity(city))
  };
}

const mapStateToProps = createStructuredSelector({
  cities: selectCities(),
  geocode: selectGeocode(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
