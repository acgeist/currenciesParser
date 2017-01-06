/* https://www.html5rocks.com/en/tutorials/file/dndfiles/ */
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById("hConsole").innerHTML += "Great success! All the File APIs are supported.";
} else {
    document.getElementById("hConsole").innerHTML += "The File APIs are not fully supported in this browser.";
}

function handleFileSelect(evt) {
    document.getElementById("hConsole").innerHTML += "<br>handleFileSelect triggered";
    var files = evt.target.files; // FileList object
    document.getElementById("hConsole").innerHTML += "<br>files = " + files;
    document.getElementById("hConsole").innerHTML += "<br>files.length = " + files.length;
    document.getElementById("hConsole").innerHTML += "<br>files[0]" + files[0];
    document.getElementById("hConsole").innerHTML += "<br>files[0]" + files[0];
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        document.getElementById("hConsole").innerHTML += "<br>i=" + i + 
        ", f = " + f;
        // Only process image files.
        /*
        if (!f.type.match('image.*')) {
            continue;
        }
        */
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                /*
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'
                ].join('');
                document.getElementById('list').insertBefore(span, null);
                */
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);