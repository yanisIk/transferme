BasicUpload = new Slingshot.Upload("basicFileUpload");

Template.uploadForm.helpers({
  file: function () {
    return Session.get("actualFile");
  }
});

/*
  http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/
*/

Template.uploadForm.events({
  'click #drop a': function (evt, temp) {
    e.preventDefault();
    // Simulate a click on the file input button
    // to show the file browser dialog
    temp.$('input').click();
  },
  
  'submit #uploadForm': function (evt, temp) {
    evt.preventDefault();
    
    var uploadOptions = {
          file: temp.find('input[type=file]').file,
          senderEmail: evt.target.senderEmail.value || "",
          receiverEmail: evt.target.receiverEmail.value || "",
          message: evt.target.message.value || "",
    }
    //TODO: Validate uploadOptions
    if (!uploadOptions.file) {
      //alert user
      sAlert.warning('Attach a file first');
      return;
    }

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
  }
});

Template.uploadForm.onRendered(function () {
    // Initialize the jQuery File Upload plugin
    $('#upload').fileupload({

        // This element will accept file drag/drop uploading
        dropZone: $('#drop'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {

            //TODO: Create file in Session
            var actualFile = {
              name: data.files[0].name,
              size: formatFileSize(data.files[0].size
            }
            Session.set("actualFile", actualFile);

            var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48"'+
                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');

            // Append the file name and file size
            tpl.find('p').text(data.files[0].name)
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>');

            // Add the HTML to the UL element
            data.context = tpl.appendTo(ul);

            // Initialize the knob plugin
            tpl.find('input').knob();

            // Listen for clicks on the cancel icon
            tpl.find('span').click(function(){

                if(tpl.hasClass('working')){
                    jqXHR.abort();
                }

                tpl.fadeOut(function(){
                    tpl.remove();
                });

            });
        },
    });
});

Template.uploadProgressBar.helpers({
  progress: function () {
    return Math.round(BasicUploader.progress() * 100);
  }
});
