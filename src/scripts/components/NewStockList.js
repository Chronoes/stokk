import React from 'react';

import NewStockPreview from './NewStockPreview';

const NewStockList = ({stocks, token}) => {
  const preview = stocks.map((stock, index) => (
    <NewStockPreview
      key={index}
      stock={stock}
      token={token}/>
  ));
  return (
    <div>
      {preview}
    </div>
  );
};

NewStockList.displayName = 'NewStockList';

export default NewStockList;
