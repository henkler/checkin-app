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
  getNearby() {
    const searchData = wrappedSearchYelp({ term: 'bar', location: '60640' });

    const businesses = searchData.businesses.map(business => ({name: business.name}));
    return JSON.stringify(businesses);
  }
});
