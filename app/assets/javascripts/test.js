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