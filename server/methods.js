import { Meteor } from 'meteor/meteor';

Meteor.methods({
  checkIn(businessId, isGoing) {
    const userId = Meteor.userId();
    if (!userId) {
      return;
    }

    // get the starting and ending time for today
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);

    const checkin = Checkins.findOne({
      businessId,
      userId,
      createdAt: { $gte: startTime, $lt: endTime }
    });

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
