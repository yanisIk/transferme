//////Slingshot///////

//Slingshot.createDirective("basicFileUpload", Slingshot.S3Storage, {
//
//  bucket: Meteor.settings.UploadsPolitics.basicUploads.bucketName,
//  acl: "public-read",
//
//  allowedFileTypes: /.*/i,
//  maxSize: Meteor.settings.UploadsPolitics.basicUploads.maxFileSizeInMb * 1024,
//  expire: Meteor.settings.UploadsPolitics.downloadLinkExpireTimeInMinutes * 60 * 1000,
//
//  authorize: function () {
//    return true;
//  },
//  key: function (file) {
//    return file.name + "-" + Date.now();
//  }
//
//});

