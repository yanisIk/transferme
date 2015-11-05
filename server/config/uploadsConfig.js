//////Slingshot///////
Slingshot.createDirective("basicFileUpload", Slingshot.S3Storage, {
  bucket: "transferme-basic",

  acl: "public-read",

  allowedFileTypes: /.*/i,
  maxSize: 2 * 1024 * 1024 * 1024 * 1024,// 2048 MB
  expire: 1 * 1000 * 60, //1minute

  authorize: function () {
    return true;
  },
  
  key: function (file) {
    return Date.now() + "-" + file.name;
  },
  
});
