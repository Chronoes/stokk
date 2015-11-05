import React from 'react';

import NewStockPreview from './NewStockPreview';

const NewStockList = ({stocks, authState}) => {
  const preview = stocks.map((stock, index) => (
    <NewStockPreview
      key={index}
      stock={stock}
      authState={authState}/>
  ));
  return (
    <div>
      {preview}
    </div>
  );
};

NewStockList.displayName = 'NewStockList';

export default NewStockList;
