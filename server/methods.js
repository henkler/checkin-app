import { Meteor } from 'meteor/meteor';

Meteor.methods({
  checkIn(businessId, isGoing) {
    const userId = Meteor.userId();
    if (!userId) {
      return;
    }

    const checkin = Checkins.findOne({ businessId, userId });

    if (isGoing && !checkin) {
      Checkins.insert({
        userId,
        businessId
      });
    } else if (!isGoing && checkin) {
      Checkins.remove(checkin);
    }
  }
});
