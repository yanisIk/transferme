Uploads = new Mongo.Collection("uploads");

/* Schema :

uploads {
	storageService: String [default: 'S3'],
	blobId: String,
	downloadUrl: URL,
	userId: String [optional],
	emailFrom: String [optional],
	emailTo: String [optional],
	message: String [optional],
	sessionId: String [Meteor sessionId],
	size: Integer (in bytes),
	uploadedAt: Date,
	daysAvailable: Integer (number of days),
	deletedAt: Date [default: null],
}

*/