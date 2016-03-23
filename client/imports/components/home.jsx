import React from 'react';
import reactMixin from 'react-mixin';
import { Meteor } from 'meteor/meteor';
import {ReactMeteorData} from 'meteor/react-meteor-data';
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
  getMeteorData() {
    return {
      user: Meteor.user(),
      isLoggedIn: Meteor.userId() !== null
    };
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
        <BusinessList businesses={this.state.businesses} isLoggedIn={this.data.isLoggedIn} doCheckin={this.doCheckin} />
      </div>
    );
  }
}

reactMixin(Home.prototype, ReactMeteorData);

export { Home };
