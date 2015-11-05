Meteor.publish('uploadCounts', function () {
  Counts.publish(this, 'numberOfUploads', Uploads.find());
});