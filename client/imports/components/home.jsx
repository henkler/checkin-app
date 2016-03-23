import React from 'react';
import reactMixin from 'react-mixin';
import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { BusinessList } from './businessList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.doCheckin = this.doCheckin.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.state = {
      latitude: null,
      longitude: null,
      businesses: []
    };
  }
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentPosition);
    }
  }
  getMeteorData() {
    let businesses = [];

    var handle = Meteor.subscribe('nearbyBars', null, this.state.latitude, this.state.longitude);
    if (handle.ready()) {
      businesses = Businesses.find().fetch();
    }
    return {
      user: Meteor.user(),
      isLoggedIn: Meteor.userId() !== null,
      businesses
    };
  }
  setCurrentPosition(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }
  doCheckin(businessID, isGoing) {
    Meteor.call('checkIn', businessID, isGoing);
  }
  render() {
    return (
      <div>
        <BusinessList
            businesses={this.data.businesses}
            isLoggedIn={this.data.isLoggedIn}
            doCheckin={this.doCheckin}
        />
      </div>
    );
  }
}

reactMixin(Home.prototype, ReactMeteorData);

export { Home };
