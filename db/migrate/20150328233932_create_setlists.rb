class CreateSetlists < ActiveRecord::Migration
  def change
    create_table :setlists do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
