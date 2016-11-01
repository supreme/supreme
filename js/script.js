$(document).ready(function() {
    console.log('Document loaded!');

    jQuery.getJSON('supreme/csv/test.json', function(data) {
        console.log(data);
    });
});
