$(document).ready(function() {
    jQuery.getJSON('csv/wikidump.csv', function(data) {
        console.log(data);
    });
});
