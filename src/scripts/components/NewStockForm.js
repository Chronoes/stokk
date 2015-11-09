import React, {Component} from 'react';

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
    this.timer = null;
    this.isLoading = false;
  }

  componentWillReceiveProps(nextProps) {
    const {searchStocksState} = nextProps;
    const errorMessage = searchStocksState.get('errorMessage');
    const isLoading = searchStocksState.get('isLoading');
    const stocksSize = searchStocksState.get('stocks').size;
    this.setState({isOpen: true, errorMessage: errorMessage});
    if (!isLoading && (stocksSize > 0 || errorMessage.length)) window.addEventListener('click', this.onPageClick);
  }

  onInputChange() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.submitSearch();
    }, 200);
  }

  submitSearch() {
    emptySearchStore();
    const searchString = this.refs.searchStock.value.trim();
    if (searchString.length === 0) {
      this.setState({isOpen: true, errorMessage: 'Please enter a stock symbol or a part of it\'s name.'});
    } else if (searchString.length > 35) {
      this.setState({isOpen: true, errorMessage: `Stock "${searchString.substring(0, 34)}..." does not exist.`});
    } else {
      this.isLoading = true;
      searchStocks(searchString);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {searchStocksState} = nextProps;
    return this.isLoading || searchStocksState.get('stocks').size > 0 ||
      searchStocksState.get('errorMessage').length > 0 ||
      nextState.errorMessage.length > 0 ||
      nextState.isOpen !== this.state.isOpen;
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
    const {searchStocksState, token} = this.props;
    const {errorMessage, isOpen} = this.state;
    const stocks = searchStocksState.get('stocks');
    this.isLoading = searchStocksState.get('isLoading');
    const preview = (
      <NewStockList stocks={stocks} token={token} errorMessage={errorMessage} />
    );
    const loader = (
      <span className="new-stock-form__preloader"></span>
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
          <div className="new-stock-form input-group">
            <span
              className="new-stock-form__search-icon-container input-group-addon"
              id="basic-addon1">
              <span className="new-stock-form__search-icon"></span>
            </span>
            <input
              type="text"
              ref="searchStock"
              className="new-stock-form__search form-control"
              placeholder="search stocks"
              aria-describedby="basic-addon1"
              onChange={this.onInputChange.bind(this)} />
              <span className="new-stock-form__preloader-container input-group-addon">{this.isLoading ? loader : ''}</span>
          </div>
          {isOpen ? preview : ''}
        </div>
      </div>
    );
  }
}

export default NewStockForm;
