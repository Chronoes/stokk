import React, {Component} from 'react';

class DashboardPage extends Component {
  render() {
    return (
      <div className="dashboard-welcome">
        <div>WELCOME TO THE DASHBOARD</div>
        <img className="dashboard-page-image" src="iconlogo.svg" />
        <p>&quot;Stokking your Stokks is simply amazeballs.&quot; -Bill Gates</p>
        <p>&quot;tra meie rakendus on nii awesome&quot; -Uku Tammet</p>
        <p>&quot;I am the best.&quot; -Kanye West</p>
        <p>&quot;Cool design&quot; -Rain Vink</p>
        <p>&quot;I couldn&t have designed it better myself.&quot; -Jony Ive</p>
        <p>&quot;I believed in the holy React!&quot; -Marten Tarkin</p>
      </div>
    );
  }
}

export default DashboardPage;
