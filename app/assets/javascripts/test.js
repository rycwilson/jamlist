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

  $('.song').click(function() {
    var song = $(this)[0].innerText;
    console.log(song);
    // parse out the title and artist from the song
    var title = song.substr(0, song.indexOf('-') - 1);
    var artist = song.substr(song.indexOf('-') + 2, song.length);
    console.log(title, artist);
    // searchAPI(artist, title);
  });

  $('.title_sort').click(function(e) {
    console.log("title clicked");
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
    e.preventDefault();
    var songs = $('ul.song_list > li').get();
    // # songs are stored as "<title> - <artist>"; need to flip this
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

// Bootstrap tab.js plugin
// Enable tabbable tabs via JavaScript (each tab needs to be activated individually):
// $('#myTab a').click(function (e) {
//   e.preventDefault();
//   $(this).tab('show');
// });

// You can activate individual tabs in several ways:
// $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
// $('#myTab a:first').tab('show'); // Select first tab
// $('#myTab a:last').tab('show'); // Select last tab
// $('#myTab li:eq(2) a').tab('show'); // Select third tab (0-indexed)

// If you are using navs to provide a navigation bar, be sure to add a role="navigation"
// to the most logical parent container of the <ul>, or wrap a <nav> element around the
// whole navigation. Do not add the role to the <ul> itself, as this would prevent it from
// being announced as an actual list by assistive technologies.

// (Note the .nav-tabs class requires the .nav base class.)

// <ul class="nav nav-tabs">
//   <li role="presentation" class="active"><a href="#">Home</a></li>
//   <li role="presentation"><a href="#">Profile</a></li>
//   <li role="presentation"><a href="#">Messages</a></li>
// </ul>