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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getNearby.bind(this));
    }
  }
  getNearby(position) {
    Meteor.call('getNearby', null, position.coords.latitude, position.coords.longitude, (error, result) => this.setState({ businesses: result }));
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
