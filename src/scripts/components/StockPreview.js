import React, {Component} from 'react';

class StockPreview extends Component {
  render() {
    const {stock} = this.props;
    return (
      <div className="stock-preview">
        {stock.symbol}&emsp;{stock.name}&emsp;{stock.change}&emsp;
        <button className="preview-add-button">
          add
        </button>
      </div>
    );
  }
}

export default StockPreview;
