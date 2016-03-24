import { Mongo } from 'meteor/mongo';

Businesses = new Mongo.Collection('businesses');
Checkins = new Mongo.Collection('checkins');

const CheckinSchema = new SimpleSchema({
  userId: {
    type: String
  },
  businessId: {
    type: String
  },
  createdAt: {
    type: Date,
    label: 'The date this checkin was created',
    autoValue() {
      return new Date();
    }
  }
});

Checkins.attachSchema(CheckinSchema);
