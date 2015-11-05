import alt from '../altInstance';
import {searchStocks, getStocksWithToken} from '../services/apiService';
import createGenericErrorHandler from '../services/genericErrorHandlerFactory';

@alt.createActions
class StockActions {
  getUserStocksWithToken(token) {
    this.dispatch();
    const {getUserStocksSuccess, getUserStocksError} = this.actions;

    getStocksWithToken(token)
      .then(response => getUserStocksSuccess(response.data.stocks))
      .catch(createGenericErrorHandler(getUserStocksError));
  }

  getUserStocksSuccess(stocks) {
    this.dispatch(stocks);
  }

  getUserStocksError(message) {
    this.dispatch(message);
  }

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

export default StockActions;
