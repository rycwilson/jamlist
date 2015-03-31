class FixDataTypeForeignkeysInSongsPlays < ActiveRecord::Migration
  def change
    remove_column :songs_plays, :song_id
    add_column :songs_plays, :song_id, :integer
    remove_column :songs_plays, :setlist_id
    add_column :songs_plays, :setlist_id, :integer
  end
end
