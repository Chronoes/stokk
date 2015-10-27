import React, {Component} from 'react';

import StrikedText from './StrikedText';

class NewStockForm extends Component {
  onSearchSubmit(event) {
    event.preventDefault();
    // TODO: implement searching and adding stocks
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <StrikedText>
            Add stocks
          </StrikedText>
          <div className="dashboard-section">
            <form onSubmit={this.onSearchSubmit.bind(this)}>
              <div className="form-group">
                <input
                  type="text"
                  ref="searchStock"
                  className="form-control"
                  placeholder="search stocks" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewStockForm;
