import { Mongo } from 'meteor/mongo';

Checkins = new Mongo.Collection("checkins");

let CheckinSchema = new SimpleSchema({
    "userID": {
        type: String,
        optional: true
    },
    "businessID": {
        type: String
    },
    "createdAt": {
        type: String,
        label: "The date this checkin was created",
        autoValue() {
            return (new Date()).toISOString();
        }
    }
});

Checkins.attachSchema(CheckinSchema);