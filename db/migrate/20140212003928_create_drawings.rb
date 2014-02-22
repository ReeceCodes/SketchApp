class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.text :name, null: false
      t.text :commands, null: false

      t.timestamps
    end
  end
end
