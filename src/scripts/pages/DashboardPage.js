import React, {Component} from 'react';

class DashboardPage extends Component {
  static createBlockquote(quote, index) {
    const {text, name} = quote;
    return (
      <blockquote
        key={index}
        className="dashboard-placeholder-blockquote">
        <p>{text}</p>
        <footer>{name}</footer>
      </blockquote>
    );
  }

  render() {
    const {email} = this.props;
    const quotes = [
      {text: 'Stokking your Stokks is simply amazeballs.', name: 'Bill Gates'},
      {text: 'Tra meie rakendus on nii awesome.', name: 'Uku Tammet'},
      {text: 'I am the best', name: 'Kanye West'},
      {text: 'Cool Design', name: 'Rain Vink'},
      {text: 'I couldn’t have designed it better myself.', name: 'Jony Ive'},
      {text: 'I believed in the holy React!', name: 'Marten Tarkin'},
    ];
    const slicePoint = Math.ceil(quotes.length / 2);
    const leftQuoteNodes = quotes
      .slice(slicePoint)
      .map(DashboardPage.createBlockquote);
    const rightQuoteNodes = quotes
      .slice(0, slicePoint)
      .map(DashboardPage.createBlockquote);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="dashboard-placeholder-container">
            <div className="col-xs-12">
              <h1 className="dashboard-placeholder-title">
                Welcome to the future, {email}
              </h1>
            </div>
            <div className="col-xs-12 col-sm-6">
              {leftQuoteNodes}
            </div>
            <div className="col-xs-12 col-sm-6">
              {rightQuoteNodes}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
