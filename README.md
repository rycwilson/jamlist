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

Add sort_by feature to Songs list

challenges
  learned how to pass a parameter through linked_to.  not as straightforward as thought

  Removing notes for now:
  <div class='col-md-4'>
    <br>
    <h3>Notes: <%= @song.title %></h3>
    <%= text_area(@song, :notes, cols:50, rows:10, readonly:"true") %>
  </div>