import React from 'react';
import { Meteor } from 'meteor/meteor';

import { BusinessList } from './businessList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };
  }
  componentWillMount() {
    Meteor.call('getNearby', 'San Diego', (error, result) => this.setState({ businesses: result }));
  }
  render() {
    return (
      <div>
        <h1>My App</h1>
        <hr />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export { Home };
