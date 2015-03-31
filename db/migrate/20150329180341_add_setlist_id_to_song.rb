class AddSetlistIdToSong < ActiveRecord::Migration
  def change
    add_column :songs, :setlist_id, :integer
  end
end
