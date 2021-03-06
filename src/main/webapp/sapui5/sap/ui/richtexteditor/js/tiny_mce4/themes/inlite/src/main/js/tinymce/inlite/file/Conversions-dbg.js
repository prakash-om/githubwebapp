

define('tinymce/inlite/file/Conversions', [
	'global!tinymce.util.Promise'
], function (Promise) {
	var blobToBase64 = function (blob) {
		return new Promise(function(resolve) {
			var reader = new FileReader();

			reader.onloadend = function() {
				resolve(reader.result.split(',')[1]);
			};

			reader.readAsDataURL(blob);
		});
	};

	return {
		blobToBase64: blobToBase64
	};
});


