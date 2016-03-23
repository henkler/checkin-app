import { Meteor } from 'meteor/meteor';
import Yelp from 'yelp';
import * as _ from 'lodash';

Meteor.publish('nearbyBars', function(location, latitude = null, longitude = null) {
    const self = this;
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

    const yelp = new Yelp({
        consumer_key: Meteor.settings.yelp.consumer_key,
        consumer_secret: Meteor.settings.yelp.consumer_secret,
        token: Meteor.settings.yelp.token,
        token_secret: Meteor.settings.yelp.token_secret,
    });

    yelp.search(searchQuery)
    .then(function(data) {
        const businesses = data.businesses;
        let businessIDArray = [];
        businesses.forEach( function(business) {
            business.checkinCount = 0;
            business.isGoing = false;
            businessIDArray.push(business.id);
            self.added('businesses', business.id, business);
        });

        // monitor changes on checkins for the retrieved businesses, and update checkin counts accordingly
        const handle = Checkins.find({businessId: { $in: businessIDArray }}).observe({
            added: function(checkin) {
                const business = _.find(businesses, {id: checkin.businessId});
                if (business) {
                    business.checkinCount++;
                    self.changed('businesses', business.id, { checkinCount: business.checkinCount })
                    if (checkin.userId === self.userId) {
                        business.isGoing = true;
                        self.changed('businesses', business.id, { isGoing: business.isGoing })
                    }
                }
            },
            removed: function(checkin) {
                const business = _.find(businesses, {id: checkin.businessId});
                if (business) {
                    business.checkinCount--;
                    self.changed('businesses', business.id, { checkinCount: business.checkinCount })
                    if (checkin.userId === self.userId) {
                        business.isGoing = false;
                        self.changed('businesses', business.id, { isGoing: business.isGoing })
                    }
                }
            }
        });

        self.ready();

        self.onStop(() => handle.stop());
    })
    .catch(function(err) {

    });
});