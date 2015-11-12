sendEmailToReceiver = function (uploadOptions) {
    Email.send({
        to: uploadOptions.emailTo,
        from: "TransferMe@gmail.com",
        subject: "TransferMe file received: "+uploadOptions.file.name,
        text: uploadOptions.emailFrom + " just sent you this file: " + uploadOptions.file.name + ". Download it here: " + uploadOptions.downloadUrl
    });
}

