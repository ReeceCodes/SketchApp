class ChangeColumnTypeAndConstraints < ActiveRecord::Migration
  def change
	change_column :drawings, :commands, :text
	
  end
end
