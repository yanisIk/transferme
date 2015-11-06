Meteor.methods({
  "Uploads.create" : function (options) {
	  check(options, UploadCreationSchema);

	  additionalFields = {
  		userId: this.userId || "",
  		sessionId: this.connection.id,
  		uploadedAt: new Date(),
	  }
	  options = _.extend(options, additionalFields);
	  Uploads.insert(options);

	  this.unblock();
	  if (options.emailTo) {
		  //Send email with download link
	  }
  }
});