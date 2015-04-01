Robustness:
  Set up user auth.  Else Spotify API won't be possible (accesses song lists)
  Don't let song get added to setlist more than once
  Don't allow a setlist named 'master', or one that already exists
  Don't allow add song to library if it exists
  Songs getting added to a setlist twice??
    maybe both setlist << songs and songs << setlist aren't necessary
  link_to clickable area is large

To delete an association:
  Setlist.find(1).songs.delete(Song.find(5))



challenges
  Getting to a particular view, having come from two different places
  - could have used redirect_to :back ?
  - i.e. Songs library and Setlist songs
  overcome: jquery's a ul li  when the li's are all added by embedded ruby
  server infinite loop when updating notes

Must have:
check AJAX to update notes
sort songs (alphabetical, by artist) and setlist (by date)
- not working
hide, expand notes
delete songs

Want:
better styling
- bigger font size
when open a song, send it to the top of the list
Songs/Setlists columns scrollable
song notes field scrollable