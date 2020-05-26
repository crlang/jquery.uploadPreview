# jquery.uploadPreview
uploadPreview is a simple jQuery plugin , Supports Local preview or ajax uploading immediately.

## Usage

- Include jQuery & jquery.uploadPreview.
- Call jquery.uploadPreview.

```html
<script src="jquery.js"></script>
<script src="jquery.uploadPreview.js"></script>
<script>
  $(document).ready(function(){
    jQuery.uploadPreview({preview_box: ".image-preview",});
  });
</script>
```

- More examples refer to the bottom


## Options

- `input_field`: (default: `.image-input`) the input field
- `preview_box`: (default: `.image-preview`) image preview box
- `label_field`: (default: `.image-label`) Box label
- `label_default`: (default: `Choose File`) The default label
- `label_selected`: (default: `Change File`) Modify the label
- `no_label: false`, (default: `false`)  Whether to hide label
- `success_callback` : (default: `null`) if the upload immediately, the server returns the response result
- `upload_input`: (default: `false`)  Whether to upload immediately, if the upload immediately, will not immediately preview
- `upload_field`: (default: `null`)  Upload form field values; If the upload immediately, this field is required
- `upload_url`: (default: `null`)  Upload Address url; If the upload immediately, this field is required
- `language`: default
```
language: {
  'notSupportType': 'This file type is not supported.',
  'notSupportBrowser': 'Your browser does not support the current plug-in, please use modern browsers.',
  'emptyUploadField': 'Upload field can not be empty.',
  'emptyUploadUrl': 'Upload URL can not be empty.',
}
```

## Events

- `success_callback`: After uploading callback, if the upload immediately, The results will return the server response.
- tip: When is local default: `event, file, options`; When is ajax default: `event, file, options`.

### e.g. Local Preview
```html
<div class="image-preview">
  <label for="image-label" class="image-label">上传封面</label>
  <input type="file" name="cover" id="image-label" class="image-input" />
</div>
<script>
  jQuery.uploadPreview({
    input_field: ".image-upload",   // Default: .image-input
    preview_box: ".image-preview",  // Default: .image-preview
    label_field: ".image-label",    // Default: .image-label
    label_default: "Upload Cover",  // Default: Choose File
    label_selected: "Edit cover",   // Default: Change File
    no_label: false,                // Default: false
    language: {
        'notSupportType': 'This file type is not supported.',
        'notSupportBrowser': 'Your browser does not support the current plug-in, please use modern browsers.'
    },
    success_callback: function(event, file, options) {
      console.log(event, file, options);
    }                               // Default: null
  });
</script>
```

### e.g. ajax preview
```html
<div class="image-preview">
  <label for="image-label" class="image-label">上传封面</label>
  <input type="file" name="cover" id="image-label" class="image-input" />
</div>
<script>
  jQuery.uploadPreview({
    input_field: ".image-upload",   // Default: .image-input
    preview_box: ".image-preview",  // Default: .image-preview
    label_field: ".image-label",    // Default: .image-label
    label_default: "Upload Cover",  // Default: Choose File
    label_selected: "Edit cover",   // Default: Change File
    no_label: false,                // Default: false
    language: {
      'notSupportType': 'This file type is not supported.',
      'notSupportBrowser': 'Your browser does not support the current plug-in, please use modern browsers.',
      'emptyUploadField': 'Upload field can not be empty.',
      'emptyUploadUrl': 'Upload URL can not be empty.',
    },
    upload_input: true,                // Default: false
    upload_field: 'cover',             // Default: null, The server receives the field values ​​corresponding to
    upload_url: 'https://upload.example.com', // Default: null
    success_callback: function(response, file, options) {
      console.log(response, file, options);
    }                               // Default: null
  });
</script>
```
