import React, {Component} from 'react';

import Preloader from './Preloader';
import StrikedText from './StrikedText';
import StockPreview from './StockPreview';
import {searchStocks} from '../actions/SearchStocksActions';

class NewStockForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      isOpen: false,
    };
    this.isHovering = false;
  }

  componentWillUnmount() {
    this.setState({errorMessage: ''});
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const searchString = this.refs.searchStock.value.trim();
    searchStocks(searchString);
    this.setState({isOpen: true});
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onPageClick.bind(this));
  }

  onPageClick() {
    if (!this.isHovering) {
      this.close();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onPageClick.bind(this));
  }

  close() {
    this.setState({isOpen: false});
  }

  render() {
    const {searchStocksState, isLoading} = this.props;
    const {errorMessage, isOpen} = this.state;
    const stock = searchStocksState.get('stock');
    const preview = (
      <StockPreview stock={stock.length > 0 ? stock : null} />
    );
    const errorNode = (
      <div className="form-alert">
        <strong>{errorMessage}</strong>
      </div>
    );
    return (
      <div className="row">
        <div className="dashboard-section">
          <StrikedText>
            Add stocks
          </StrikedText>
          <div className="search-preview col-centered">
            <form onSubmit={this.onSearchSubmit.bind(this)}>
              <div
                onMouseOver={() => this.isHovering = true}
                onMouseOut={() => this.isHovering = false}>
                <input
                  type="text"
                  ref="searchStock"
                  className="form-control"
                  placeholder="search stocks" />
                  {stock.length > 0 && isOpen ? preview : ''}
                  {errorMessage ? errorNode : ''}
                  {isLoading ? <Preloader /> : ''}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewStockForm;
