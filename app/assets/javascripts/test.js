$(document).ready(function() {

  function searchAPI(artist, song) {
    $.getJSON("http://lyrics.wikia.com/api.php?callback=?",
    {
      func: 'getSong',
      artist: artist,
      song: song,
      fmt: 'jsonp' // legacy fix... see docs
    },
      function(data) {
        console.log(data);
        $('iframe').attr("src", data.url);
    });
  }

  //
  // Some issues with the response from LyricsWiki, so
  // lyrics are presently accessed directly by the server
  // via url string manipulation.
  // This function not presently in use
  //
  $('.song').click(function() {
    var song = $(this)[0].innerText;
    // parse out the title and artist from the song
    var title = song.substr(0, song.indexOf('-') - 1);
    var artist = song.substr(song.indexOf('-') + 2, song.length);
    // searchAPI(artist, title);
  });

  // Save song notes
  // AJAX sends the update so as to avoid a lyrics reload
  //
  // need to know current song?
  $('.notes').submit(function(e) {
    e.preventDefault();
    var notes = $(this).find('#song_notes').val();
    var data = JSON.stringify({"song": { "notes": notes }});
    var song_id = e.target.baseURI[e.target.baseURI.length - 1];
    console.log('AJAX request sent for: song_id:' + song_id);
    console.log('Data:' + data);
    $.ajax({
      url: "http://localhost:3000/songs/" + song_id + ".json",
      type: "PUT",
      data: data,
      contentType: 'application/json',
      dataType: 'html',
      success: function(data, status) {
        console.log('success: ', data, status);
      },
      error: function(object, status) {
        console.log('error: ', object, status);
      }
    });
  });

  // Functions to sort the master song list alphabetically,
  // either by title or artist
  // Buggy!
  $('.title_sort').click(function(e) {
    console.log("title_sort clicked");
    e.preventDefault();
    var songs = $('ul.song_list > li').get();
    songs.sort(function(a, b) {
      return $(a).text().toLowerCase().localeCompare($(b).text().toLowerCase());
    });
    songs.forEach(function(song) {
      $('ul.song_list').append(song);
    });
  });

  $('.artist_sort').click(function(e) {
    console.log('artist_sort clicked');
    e.preventDefault();
    var songs = $('ul.song_list > li').get();
    // # songs are stored as "<title> - <artist>"
    // need to flip this to "<artist> - <song>"
    var flipped = songs.map(function(song) {
      var song_html = $(song).html();
      var start_tag = song_html.substr(0, song_html.indexOf('>') + 1);
      var close_tag = song_html.substr(song_html.length - 4, song_html.length - 1);
      var flipped_song =
        $(song).text().substr($(song).text().indexOf('-') + 2, $(song).text().length) + ' - ' +
        $(song).text().substr(0, $(song).text().indexOf('-') - 1);
      return start_tag + flipped_song + close_tag;
    });
    flipped.sort(function(a, b) {
      return $(a).text().toLowerCase().localeCompare($(b).text().toLowerCase());
    });
    $('ul.song_list').empty();
    flipped.forEach(function(song) {
      $('ul.song_list').append("<li>" + song + "</li>");
    });
  });

});
