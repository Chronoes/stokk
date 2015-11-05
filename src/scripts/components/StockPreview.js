import React, {Component} from 'react';

class StockPreview extends Component {
  render() {
    const {stock} = this.props;
    return (
      <div className="stock-preview">
        {stock[0].symbol}&emsp;{stock[0].name}&emsp;
        <button className="preview-add-button">
          add
        </button>
      </div>
    );
  }
}

export default StockPreview;
