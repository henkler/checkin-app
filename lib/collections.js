import { Mongo } from 'meteor/mongo';

Businesses = new Mongo.Collection("businesses");
Checkins = new Mongo.Collection("checkins");

let CheckinSchema = new SimpleSchema({
    "userId": {
        type: String
    },
    "businessId": {
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