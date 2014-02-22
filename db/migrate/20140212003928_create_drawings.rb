class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.string :name
      t.string :commands

      t.timestamps
    end
  end
end
