import React from 'react';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';

import { BusinessList } from './businessList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.doCheckin = this.doCheckin.bind(this);
    this.getNearby = this.getNearby.bind(this);
    this.state = {
      businesses: [],
    };
  }
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getNearby);
    }
  }
  getNearby(position) {
    Meteor.call('getNearby', null, position.coords.latitude, position.coords.longitude, (error, result) => this.setState({ businesses: result }));
  }
  doCheckin(businessID, isGoing) {
    Meteor.call('checkIn', businessID, isGoing, function(error, result) {
      if(!error) {
        this.updateBusinessCheckinCount(businessID, result, isGoing);
      }
    }.bind(this));
  }
  updateBusinessCheckinCount(businessID, checkinCount, isGoing) {
    const business = _.find(this.state.businesses, {'id': businessID});
    if (business) {
      business.checkinCount = checkinCount;
      business.isGoing = isGoing;
      this.setState({businesses: this.state.businesses});
    }
  }
  render() {
    return (
      <div>
        <h1>My App</h1>
        <hr />
        <BusinessList businesses={this.state.businesses} doCheckin={this.doCheckin} />
      </div>
    );
  }
}

export { Home };
