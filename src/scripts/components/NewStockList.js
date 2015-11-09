import React, {Component} from 'react';

import Alert from './Alert';
import NewStockPreview from './NewStockPreview';

class NewStockList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.stocks.size > 0 || nextProps.errorMessage.length > 0;
  }

  render() {
    const {stocks, token, errorMessage} = this.props;
    const alert = (
      <Alert message={errorMessage} type="warning" margin="top" />
    );
    const preview = stocks.map((stock, index) => (
    <NewStockPreview
      key={index}
      stock={stock}
      token={token}/>
    ));
    return (
      <div>
        {errorMessage ? alert : ''}
        {preview}
      </div>
    );
  }
}

export default NewStockList;
