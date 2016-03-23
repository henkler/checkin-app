import React from 'react';
import reactMixin from 'react-mixin';
import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import { BusinessList } from './businessList.jsx';

const style = {
  marginTop: 20,
  marginBottom: 20
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.doCheckin = this.doCheckin.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.locationInputChanged = this.locationInputChanged.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.state = {
      locationInput: null,
      location: null,
      latitude: null,
      longitude: null
    };
  }
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentPosition);
    }
  }
  getMeteorData() {
    let businesses = [];

    var handle = Meteor.subscribe('nearbyBars', this.state.location, this.state.latitude, this.state.longitude);
    if (handle.ready()) {
      businesses = Businesses.find().fetch();
    }
    return {
      user: Meteor.user(),
      isLoggedIn: Meteor.userId() !== null,
      businesses
    };
  }
  locationInputChanged(event) {
    let locationInput = event.target.value;
    if (!locationInput) {
      locationInput = null;
    }
    this.setState({ locationInput });
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
  doSearch() {
    this.setState({ location: this.state.locationInput });
  }
  render() {
    return (
      <div>
        <Paper style={style} zDepth={4}>
          <TextField
              hintText="Search Location"
              onChange={(event) => this.locationInputChanged(event)}
              onEnterKeyDown={(event) => this.doSearch()}
          />
          <RaisedButton
              label="Search"
              secondary={true}
              onClick={(event) => this.doSearch()}
          />
        </Paper>
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
