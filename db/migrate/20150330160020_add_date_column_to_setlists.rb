class AddDateColumnToSetlists < ActiveRecord::Migration
  def change
    add_column :setlists, :date, :date
  end
end
