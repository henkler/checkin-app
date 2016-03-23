import { Meteor } from 'meteor/meteor';
import Yelp from 'yelp';

function searchYelp(req, callback) {
  const yelp = new Yelp({
    consumer_key: Meteor.settings.yelp.consumer_key,
    consumer_secret: Meteor.settings.yelp.consumer_secret,
    token: Meteor.settings.yelp.token,
    token_secret: Meteor.settings.yelp.token_secret,
  });

  yelp.search(req, callback);
}
const wrappedSearchYelp = Meteor.wrapAsync(searchYelp);

Meteor.methods({
  getNearby(location, latitude = null, longitude = null) {
    const searchQuery = {};
    searchQuery.term = 'bar';

    if (location !== null) {
      searchQuery.location = location;
      if (latitude !== null && longitude !== null) {
        searchQuery.cll = latitude + ',' + longitude;
      }
    }
    else if (latitude !== null && longitude !== null) {
      searchQuery.ll = latitude + ',' + longitude;
    }

    const searchData = wrappedSearchYelp(searchQuery);
    searchData.businesses.forEach( function(business) {
      const checkins = Checkins.find({businessID: business.id});
      if (checkins) {
        business.checkinCount = checkins.count();
        business.isGoing = true;
      }
      else {
        business.isGoing = false;
      }
    });
    return searchData.businesses;
  },
  checkIn(businessID, isGoing) {
    const checkin = Checkins.findOne({businessID: businessID});

    if(isGoing && !checkin) {
      Checkins.insert({
        businessID: businessID
      });
    }
    else if (!isGoing && checkin) {
      Checkins.remove(checkin);
    }

    // return the number going
    return Checkins.find({businessID: businessID}).count();
  }
});
