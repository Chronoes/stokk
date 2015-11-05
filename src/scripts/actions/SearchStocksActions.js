import alt from '../altInstance';
import {searchStocks} from '../services/apiService';
import createGenericErrorHandler from '../services/genericErrorHandlerFactory';

@alt.createActions
class SearchStocksActions {
  searchStocks(searchString) {
    this.dispatch();
    const {searchError, searchSuccess} = this.actions;

    searchStocks(searchString)
      .then(response => searchSuccess(response.data.stocks))
      .catch(createGenericErrorHandler(searchError));
  }

  searchError(message) {
    this.dispatch(message);
  }

  searchSuccess(stocks) {
    this.dispatch(stocks);
  }
}

export default SearchStocksActions;
