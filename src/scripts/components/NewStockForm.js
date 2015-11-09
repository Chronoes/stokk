import React, {Component} from 'react';

import Alert from './Alert';
import Preloader from './Preloader';
import StrikedText from './StrikedText';
import NewStockList from './NewStockList';
import {searchStocks, emptySearchStore} from '../actions/SearchStocksActions';

class NewStockForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      errorMessage: '',
    };
    this.isHovering = false;
    this.onPageClick = this.onPageClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {searchStocksState} = nextProps;
    const errorMessage = searchStocksState.get('errorMessage');
    const isLoading = searchStocksState.get('isLoading');
    const stocksSize = searchStocksState.get('stocks').size;
    this.setState({isOpen: true, errorMessage: errorMessage});
    if (!isLoading && (stocksSize > 0 || errorMessage.length)) window.addEventListener('click', this.onPageClick);
  }

  onSearchSubmit() {
    emptySearchStore();
    const searchString = this.refs.searchStock.value.trim();
    if (searchString.length === 0) {
      this.setState({isOpen: false, errorMessage: 'Please enter a stock symbol or a part of it\'s name.'});
    } else {
      searchStocks(searchString);
      this.setState({isOpen: false});
    }
  }

  shouldComponentUpdate(nextProps) {
    const {searchStocksState} = nextProps;
    return searchStocksState.get('stocks').size > 0 || searchStocksState.get('errorMessage').length > 0;
  }

  onPageClick() {
    if (!this.isHovering) {
      emptySearchStore();
      this.close();
      window.removeEventListener('click', this.onPageClick);
    }
  }

  componentWillUnmount() {
    this.setState({isOpen: false, errorMessage: ''});
  }

  close() {
    this.setState({isOpen: false, errorMessage: ''});
  }

  render() {
    const {searchStocksState, isLoading, token} = this.props;
    const {errorMessage, isOpen} = this.state;
    const stocks = searchStocksState.get('stocks');
    const preview = (
      <NewStockList stocks={stocks} token={token} />
    );
    const alert = (
      <Alert message={errorMessage} type="warning" margin="top" />
    );
    return (
      <div>
        <StrikedText>
          Add stocks
        </StrikedText>
        <div
          className="new-stock-form"
          onMouseOver={() => this.isHovering = true}
          onMouseOut={() => this.isHovering = false}>
          <input
            type="text"
            ref="searchStock"
            className="new-stock-form__search form-control"
            placeholder="search stocks"
            onChange={this.onSearchSubmit.bind(this)}
            />
          {stocks.size > 0 && isOpen && !errorMessage ? preview : ''}
          {errorMessage ? alert : ''}
          {isLoading ? <Preloader /> : ''}
        </div>
      </div>
    );
  }
}

export default NewStockForm;
