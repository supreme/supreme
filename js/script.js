$(document).ready(function() {
    console.log('Document loaded!');
    
    jQuery.getJSON('../csv/wikidump.csv', function(data) {
        console.log(data);
    });
});
