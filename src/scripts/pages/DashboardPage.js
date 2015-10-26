import React, {Component} from 'react';

import DashboardOverview from '../components/DashboardOverview';

class DashboardPage extends Component {
  render() {
    const {email} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <DashboardOverview
            email={email}
            stockAmount={0} />
        </div>
      </div>
    );
  }
}

export default DashboardPage;
