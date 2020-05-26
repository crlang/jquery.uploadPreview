(function ($) {
  $.extend({
    uploadPreview : function (options) {

      // Options + Defaults
      var settings = $.extend({
        input_field: ".image-input", // Input field
        preview_box: ".image-preview", // Preview box
        label_field: ".image-label", // Box label
        label_default: "Choose File", // The default label
        label_selected: "Change File", // Modify the label
        no_label: false, // Whether to hide label
        success_callback : null, // Success callback, if the upload immediately, the server returns the response result
        upload_input: false, // Whether to upload immediately, if the upload immediately, will not immediately preview
        upload_field: null, // Upload form field values; If the upload immediately, this field is required
        upload_url: null, // Upload Address url; If the upload immediately, this field is required
        language: {
          'notSupportType': 'This file type is not supported.',
          'notSupportBrowser': 'Your browser does not support the current plug-in, please use modern browsers.',
          'emptyUploadField': 'Upload field can not be empty.',
          'emptyUploadUrl': 'Upload URL can not be empty.',
        }
      }, options);

      // Check if FileReader is available
      if (window.File && window.FileList && window.FileReader) {
        if (typeof($(settings.input_field)) !== 'undefined' && $(settings.input_field) !== null) {
          $(settings.input_field).change(function() {
            var files = this.files;

            if (files.length > 0) {
              var file = files[0];
              var reader = new FileReader();

              // Load file
              reader.addEventListener("load",function(event) {
                var loadedFile = event.target;

                // Check format
                if (file.type.match('image')) {
                  // Image
                  if(settings.upload_input === false) $(settings.preview_box).css("background-image", "url("+loadedFile.result+")");
                  $(settings.preview_box).css("background-size", "100% 100%");
                  $(settings.preview_box).css("background-position", "center center");
                } else {
                  alert(settings.language.notSupportType);
                }
              });

              if (settings.no_label == false) {
                // Change label
                $(settings.label_field).html(settings.label_selected);
              }

              // Read the file
              reader.readAsDataURL(file);

              // Success callback function call
              if(settings.success_callback && settings.upload_input === false) {
                settings.success_callback(file, options, settings);
              }

              // Upload Now
              if (settings.upload_input) {

                // If the upload immediately, these two fields must be filled
                if (!settings.upload_field) {
                  alert(settings.language.emptyUploadField);
                  return false;
                }
                if (!settings.upload_url) {
                  alert(settings.language.emptyUploadUrl);
                  return false;
                }

                var nfd = new FormData();
                nfd.append('files', file);
                nfd.append('type', settings.upload_field);
                $.ajax({
                  url: settings.upload_url,
                  type: 'POST',
                  dataType: 'json',
                  data: nfd,
                  contentType:false,
                  processData:false,
                  success: function(res) {
                    if(settings.success_callback) {
                      settings.success_callback(res, file, options, settings);
                    }
                  },
                  error: function() {
                    if(settings.success_callback) {
                      settings.success_callback(null, file, options, settings);
                    }
                  }
                });
              }
            } else {
              if (settings.no_label == false) {
                // Change label
                $(settings.label_field).html(settings.label_default);
              }

              // Clear background
              $(settings.preview_box).css("background-image", "none");
            }
          });
        }
      } else {
        alert(settings.language.notSupportBrowser);
        return false;
      }
    }
  });
})(jQuery);
