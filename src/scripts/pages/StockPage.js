import React, {Component, PropTypes as Types} from 'react';

class StockPage extends Component {
  static displayName = 'StockPage';
  static propTypes = {
    params: Types.shape({
      id: Types.string.isRequired,
    }).isRequired,
  };

  render() {
    const {id} = this.props.params;
    return (
      <div className="container-fluid">
        <h1>Welcome to battletits {id}</h1>
      </div>
    );
  }
}

export default StockPage;
