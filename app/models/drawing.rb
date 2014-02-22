class Drawing < ActiveRecord::Base
	#default_scope -> {order('created_at DESC')}
	validates :name, presence: true, length: {maximum: 50}
	validates :commands, presence: true, format: { with: /\A([zZxXnNmM]{1},{1})+\z/, multiline: true }
	validates :startx, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 600 }
	validates :starty, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 1000 }
	
	def self.recent
		@drawing = Drawing.all(order: 'created_at DESC', limit: 10)
	end
	
end
