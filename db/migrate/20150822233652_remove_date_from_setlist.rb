class RemoveDateFromSetlist < ActiveRecord::Migration
  def change
    remove_column :setlists, :date, :string
  end
end
