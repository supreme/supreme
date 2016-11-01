$(document).ready(function() {
    console.log('Document loaded!');

    jQuery.getJSON('/csv/test.json', function(data) {
        console.log(data);
    });
});
