import alt from '../altInstance';
import {getStocksWithToken, addNewStockWithToken} from '../services/apiService';
import createGenericErrorHandler from '../services/genericErrorHandlerFactory';

@alt.createActions
class UserStocksActions {
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

  addNewStockWithToken(stockSymbol, token) {
    this.dispatch();
    const {addNewStockSuccess, addNewStockError} = this.actions;

    addNewStockWithToken(stockSymbol, token)
      .then(response => addNewStockSuccess(response.data.stock))
      .catch(createGenericErrorHandler(addNewStockError));
  }

  addNewStockSuccess(stock) {
    this.dispatch(stock);
  }

  addNewStockError(message) {
    this.dispatch(message);
  }

}

export default UserStocksActions;
