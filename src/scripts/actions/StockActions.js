import alt from '../altInstance';
import {searchStocks} from '../services/apiService';

@alt.createActions
class StockActions {
  searchStocks(searchString) {
    this.dispatch();
    const {searchError, searchSuccess} = this.actions;

    searchStocks(searchString)
      .then(response => searchSuccess(response.data.stocks))
      .catch(response => {
        if (response instanceof Error) {
          searchError(response.data.message);
        } else {
          if (response.data.message) {
            searchError(response.data.message);
          } else {
            searchError('Something went wrong. Please try again.');
          }
        }
      });
  }

  searchError(message) {
    this.dispatch(message);
  }

  searchSuccess(stocks) {
    this.dispatch(stocks);
  }
}

export default StockActions;
