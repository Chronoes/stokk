import React, {Component} from 'react';

import Preloader from './Preloader';
import StrikedText from './StrikedText';
import StockPreview from './StockPreview';
import {searchStocks} from '../actions/StockActions';

class NewStockForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      isOpen: false,
    };
    this.isHovering = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errorMessage: nextProps.errorMessage});
  }

  componentWillUnmount() {
    this.setState({errorMessage: ''});
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const searchString = this.refs.searchStock.value.trim();
    searchStocks(searchString);
    this.setState({errormessage: '', isOpen: true});
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
    // const previews = stocks.map(stock => <StockPreview stock={stock} key={stock.symbol} />);
    const {isLoading} = this.props;
    const {stockState} = this.props;
    const {errorMessage} = this.state;
    const {isOpen} = this.state;
    const preview = (
      <StockPreview stock={stockState.get('stock')} />
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
                  {stockState.get('stock') && isOpen ? preview : ''}
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
