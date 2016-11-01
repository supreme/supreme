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
            // for (int j = 0; j < obj.albums.length; j++) {
            //     var album = obj.albums[j];
            // //     content.append('<p>' + album.artist + 
            // //         ' - ' + album.album + '</p>');
            // }
            content.append('</div>');
        }
        // for (var item in data) {
        //     console.log(item);
        //     console.log(item.albums);
        //     var content = $('#releases');
        //     content.append('<div class="item">');
        //     content.append('<p>' + item + '</p>');

        //     for (var release in item.albums) {
        //         //console.log(release);
        //         content.append('<p>' + release.artist + 
        //             ' - ' + release.album + '</p>');
        //     }
        //     content.append('</div>');
        //     //console.log(item);
        // }
    });
});
