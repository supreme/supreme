$(document).ready(function() {
    console.log('Document loaded!');

    $.getJSON('json/wikidump.json', function(data) {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var albums = data[i].albums
            var content = $('#releases');
            content.append('<div class="item">');
            content.append('<p>' + obj.date + '</p>');

            for (var j = 0; j < albums.length; j++) {
                var album = albums[j];
                content.append('<p style="margin-left: 10px">' + album.artist +
                    ' - ' + album.album + '</p>');
            }
            content.append('</div>');
        }
    });
});
