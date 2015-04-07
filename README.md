Most proud of:
- got it done in 4 days, getting better with Rails
- worked my way out of a big hole yesterday
- AJAX to update notes


What to do with more time:

User Auth -> Spotify API
Setlists/Songs columns scrollable
random image generator
band in town API
Record songs!
Sort function is buggy
Notes: expand to make bigger
  add a template (e.g. "intro", "verse", "chorus", "transition")
  ability to hide
  make scrollable
  bring selected song to the top
Date input

Robustness:
  Don't allow add song to library if it exists
  Don't let song get added to setlist more than once
  link_to clickable area (song title) is large


Setlist: both name and date, display date under name
- list songs in proper order
song counter




To delete an association:
  Setlist.find(1).songs.delete(Song.find(5))

challenges
  Getting to a particular view, having come from two different places
  - could have used redirect_to :back ?
  - i.e. Songs library and Setlist songs
  overcome: jquery's a ul li  when the li's are all added by embedded ruby

Want:
better styling
- bigger font size
