var app = angular.module("JamList", []);

// Required to POST/PUT/PATCH to Rails
app.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.
    defaults.headers.common["X-CSRF-TOKEN"] = $("meta[name=csrf-token]").attr("content");
}]);

app.controller("MainCtrl", ['$scope', '$http', 'songFactory', 'setlistFactory',
  function ($scope, $http, songFactory, setlistFactory) {

  $scope.songs = null;
  $scope.setlists = null;
  $scope.newSetlist = {};
  $scope.newSong = {};

  allSongs();
  allSetlists();

  function allSongs () {
    songFactory.getSongs()
      .success(function (songs) {
        $scope.songs = songs;
        console.log(songs);
      })
      .error(function (error) {
        console.log('Error loading data: ' + error);
      });
  }

  function allSetlists () {
    setlistFactory.getSetlists()
      .success(function (setlists) {
        $scope.setlists = setlists;
        console.log(setlists);
      })
      .error(function (error) {
        console.log('Error loading data: ' + error);
      });
  }

  $scope.addSetlist = function () {
    $scope.setlists.push($scope.newSetlist);
    setlistFactory.addSetlist($scope.newSetlist)
      .success(function (setlist) {
        console.log('success: ', setlist);
      })
      .error(function (error) {
        console.log('Error adding setlist: ' + error);
      });
    $scope.newSetlist = null;
  };

  $scope.addSong = function () {
    $scope.songs.push($scope.newSong);
    songFactory.addSong($scope.newSong)
      .success(function (song) {
        console.log('success: ', song);
      })
      .error(function (error) {
        console.log('Error adding song: ' + error);
      });
    $scope.newSong = null;
  };

  $scope.tabSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };

  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
  };

}]);

app.factory('setlistFactory', ['$http', function ($http) {
  var setlistFactory = {};
  setlistFactory.getSetlists = function () {
    return $http.get('/setlists.json');
  };
  setlistFactory.addSetlist = function (newSetlist) {
    return $http.post('/setlists.json', {setlist: newSetlist});
  };
  return setlistFactory;
}]);

app.factory('songFactory', ['$http', function ($http) {
  var songFactory = {};
  songFactory.getSongs = function() {
    return $http.get('/songs.json');
  };
  songFactory.addSong = function(newSong) {
    return $http.post('/songs.json', {song: newSong});
  };
  return songFactory;
}]);

/*
Data-binding debugging tool
Uncomment all this and whenever an expression {{ }} is evaluated,
results will log to the console.
app.config(['$provide', function ($provide) {
  $provide.decorator("$interpolate", ['$delegate', function ($delegate) {
    var interpolateWrap = function() {
      var interpolationFn = $delegate.apply(this, arguments);
        if(interpolationFn) {
          return interpolationFnWrap(interpolationFn, arguments);
        }
    };
    var interpolationFnWrap = function(interpolationFn, interpolationArgs) {
      return function() {
        var result = interpolationFn.apply(this, arguments);
        var log = result ? console.log : console.warn;
        log.call(console, "interpolation of  " + interpolationArgs[0].trim(),
            ":", result.trim());
        return result;
      };
    };
    angular.extend(interpolateWrap, $delegate);
    return interpolateWrap;
  }]);
}]);
*/

/*
  var sort_state = 'database_id';
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
      dataType: 'json',
      success: function(data, status) {
        console.log('success: ', data, status);
      },
      error: function(object, status) {
        console.log('error: ', object, status);
      }
    });
  });

  // Sort the song list by title
  $('.title_sort').click(function(e) {
    e.preventDefault();
    // the $.get() function returns an array of the selected elements (the li's)
    // i.e. an array of jquery objects
    var songs = $('ul.song_list > li').get();
    // if the songs are presently sorted by artist (artist - title),
    // need to flip them (title - artist)
    if (sort_state == 'artist') {
      songs = flipSongs(songs);
    }
    songs.sort(function(a, b) {
      return $(a).text().toLowerCase().localeCompare($(b).text().toLowerCase());
    });
    $('ul.song_list').empty();
    songs.forEach(function(song) {
      $('ul.song_list').append(song);
    });
    sort_state = "title";
  });

  // Sort the song list by artist
  $('.artist_sort').click(function(e) {
    e.preventDefault();
    var songs = $('ul.song_list > li').get();
    if (sort_state !== 'artist') {
      songs = flipSongs(songs);
    }
    songs.sort(function(a, b) {
      return $(a).text().toLowerCase().localeCompare($(b).text().toLowerCase());
    });
    $('ul.song_list').empty();
    songs.forEach(function(song) {
      $('ul.song_list').append(song);
    });
    sort_state = 'artist';
  });

  // flipSongs takes the song list (an array of <li> jquery objects), and flips
  // the inner HTML of each.  So, for example, a song that is being displayed
  // as 'title - artist' will now be displayed as 'artist - title'
  function flipSongs(songs) {
    var song_html, start_tag, close_tag, flipped_song;
    var flipped = songs.map(function(song) {
      song_html = $(song).html();
      start_tag = song_html.substr(0, song_html.indexOf('>') + 1);
      close_tag = song_html.substr(song_html.length - 4, song_html.length - 1);
      flipped_song =
        $(song).text().substr($(song).text().indexOf('-') + 2, $(song).text().length) + ' - ' +
        $(song).text().substr(0, $(song).text().indexOf('-') - 1);
      $(song).html(start_tag + flipped_song + close_tag);
      return song;
    });
    return flipped;
  }
*/
