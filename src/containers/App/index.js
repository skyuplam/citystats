import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  isEmpty,
  head,
  keys,
} from 'lodash';

import {
  selectCities,
} from './selectors';

import {
  fetchCities,
  searchCity,
  sortCol,
} from './actions';


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
    } = this.props;

    return (
      <div className="App">
        Search <input onChange={onSearch}/>
        {
          isEmpty(cities) ? null :
          <table>
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
  };
}

const mapStateToProps = createStructuredSelector({
  cities: selectCities(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
