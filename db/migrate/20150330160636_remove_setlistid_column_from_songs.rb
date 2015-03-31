class RemoveSetlistidColumnFromSongs < ActiveRecord::Migration
  def change
    remove_column :songs, :setlist_id
  end
end
