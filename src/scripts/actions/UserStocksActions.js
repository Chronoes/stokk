import alt from '../altInstance';
import {getStocksWithToken} from '../services/apiService';
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
}

export default StockActions;
