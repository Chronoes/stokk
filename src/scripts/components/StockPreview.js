import React from 'react';

const StockPreview = ({stock}) => {
  const {symbol, name} = stock[0];
  return (
    <div className="stock-preview">
      {`${symbol} ${name}`}
      <button className="stock-preview__add-button">
        add
      </button>
    </div>
  );
};

StockPreview.displayName = 'StockPreview';

export default StockPreview;
