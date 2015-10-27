import React, {Component} from 'react';

import DashboardOverview from '../components/DashboardOverview';
import DashboardStocks from '../components/DashboardStocks';
import NewStockForm from '../components/NewStockForm';

class DashboardPage extends Component {
  render() {
    const {email} = this.props;

    return (
      <div className="container-fluid">
        <DashboardOverview
          email={email}
          stockAmount={0} />
        <DashboardStocks />
        <NewStockForm />
      </div>
    );
  }
}

export default DashboardPage;
