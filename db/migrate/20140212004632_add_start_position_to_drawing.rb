class AddStartPositionToDrawing < ActiveRecord::Migration
  def change
    add_column :drawings, :startx, :integer
    add_column :drawings, :starty, :integer
  end
end
