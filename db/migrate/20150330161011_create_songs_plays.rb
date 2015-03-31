class CreateSongsPlays < ActiveRecord::Migration
  def change
    create_table :songs_plays do |t|
      t.string :song_id
      t.string :setlist_id

      t.timestamps null: false
    end
  end
end
