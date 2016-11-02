var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

$(document).ready(function() {
    console.log('Document loaded!');
    
    $.getJSON('json/wikidump.json', function(obj) {
        var updated_at = obj.updated;
        var data = obj.data;
        $('#updated').text(updated_at)

        for (var i = data.length - 1; i >= 0; i--) {
            var obj = data[i];
            var albums = data[i].albums
            var content = $('#releases');

            var d = new Date();
            var shouldPrint = obj.date.startsWith(months[d.getMonth()]) 
                || obj.date.startsWith(months[d.getMonth() - 1]);
                // || obj.date.startsWith(months[d.getMonth() - 2])
            if (!shouldPrint) {
                continue;
            }

            content.append('<div class="item">');
            content.append('<p class="release-date">' + obj.date + '</p>');

            for (var j = 0; j < albums.length; j++) {
                var album = albums[j];
                content.append('<p style="margin-left: 20px">' + album.artist +
                    ' / ' + album.album + '</p>');
            }
            content.append('</div>');
        }
    });
});