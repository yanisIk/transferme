Uploads = new Mongo.Collection("uploads");
if (Meteor.isServer) {
    Uploads._ensureIndex({'userId': 1});
    Uploads._ensureIndex({'sessionId': 1});
}
UploadCreationSchema =  new SimpleSchema({
	file: {
		type: Object,
		label: "File"
	},
	downloadUrl: {
		type: SimpleSchema.RegEx.Url,
		label: "Download URL"
	},
	emailTo: {
		type: SimpleSchema.RegEx.Email,
		label: "Email to",
		optional: true
	},
	emailFrom: {
		type: SimpleSchema.RegEx.Email,
		label: "Email from",
		optional: true
	},
	message: {
		type: String,
		label: "Message",
		optional: true
	}
});

/* Schema (complete) in DB :

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