import React, {Component} from 'react';

import Preloader from './Preloader';
import StrikedText from './StrikedText';
import NewStockList from './NewStockList';
import {searchStocks} from '../actions/SearchStocksActions';

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
    this.setState({isOpen: !isLoading, errorMessage: errorMessage});
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const searchString = this.refs.searchStock.value.trim();
    if (searchString.length === 0) {
      this.setState({isOpen: false, errorMessage: 'Please enter a stock symbol or a part of it\'s name.'});
    } else {
      searchStocks(searchString);
      this.setState({isOpen: false});
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onPageClick);
  }

  onPageClick() {
    if (!this.isHovering) {
      this.close();
    }
  }

  componentWillUnmount() {
    this.setState({isOpen: false, errorMessage: ''});
    window.removeEventListener('mousedown', this.onPageClick);
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
    const errorNode = (
      <div className="form-alert">
        <strong>{errorMessage}</strong>
      </div>
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
          <form onSubmit={this.onSearchSubmit.bind(this)}>
            <input
              type="text"
              ref="searchStock"
              className="new-stock-form__search form-control"
              placeholder="search stocks" />
          </form>
          {stocks.size > 0 && isOpen && !errorMessage ? preview : ''}
          {errorMessage ? errorNode : ''}
          {isLoading ? <Preloader /> : ''}
        </div>
      </div>
    );
  }
}

export default NewStockForm;
