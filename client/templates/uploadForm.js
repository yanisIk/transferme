BasicUploader = new Slingshot.Upload("basicFileUpload");
Session.set("actualFile", null);

Template.uploadForm.helpers({
    file: function () {
        return Session.get("actualFile");
    },
    progress: function () {
        if (Session.get("actualFile")) {
            var progress = Math.round(BasicUploader.progress() * 100);
            if (!progress) {
                return 85;
            }
            return progress;
        }
        return 0;
    }
});

/*
  http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/
*/

Template.uploadForm.events({
    'click #drop a': function (evt, temp) {
        evt.preventDefault();
        // Simulate a click on the file input button
        // to show the file browser dialog
        temp.$('input').click();
    },

    'submit #uploadForm': function (evt, temp) {
        evt.preventDefault();

        var uploadOptions = {
              file: Session.get('actualFile').originalFile,
              emailFrom: evt.target.emailFrom.value || "",
              emailTo: evt.target.emailTo.value || "",
              message: evt.target.message.value || ""
        }
        //TODO: Validate uploadOptions
        if (!uploadOptions.file) {
          //alert user
          sAlert.warning('Attach a file first');
          return;
        }
        console.log('UPLOAD OPTIONS:', uploadOptions);
        /*
        BasicUploader.send(file, function (error, downloadUrl) {
          if (error) {
            sAlert.error("Error while uploading file");
            throw new Meteor.Error(error);
          }
          else {
            Meteor.call('Uploads.create', uploadOptions, function (err, result) {
              if (err) {
                sAlert.error("Error while saving your upload");
              }
            });
          }
        });
        */
    }
});

Template.uploadForm.onRendered(function () {
    // Initialize the jQuery File Upload plugin
    $('#uploadForm').fileupload({

        // This element will accept file drag/drop uploading
        dropZone: $('#drop'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            //Create file object in Session
            var actualFile = {
                name: data.files[0].name,
                size: formatFileSize(data.files[0].size),
                originalFile: EJSON.stringify(data.files[0])
            }
            Session.set("actualFile", actualFile);

            var fileStatusElement = $('.working');
            // Initialize the knob plugin
            fileStatusElement.find('input').knob();

            // Listen for clicks on the cancel icon
            fileStatusElement.find('span').click(function(){
                console.log('REMOVE FILE');
                if(fileStatusElement.hasClass('working')){
                    //Cancel upload
                    console.log('CANCEL UPLOAD');
                    //BasicUploader.abort() ???
                }

                fileStatusElement.fadeOut(function(){
                    fileStatusElement.remove();
                });

            });
        }
    });
});

Template.uploadProgressBar.helpers({
  progress: function () {
    return Math.round(BasicUploader.progress() * 100);
  }
});
