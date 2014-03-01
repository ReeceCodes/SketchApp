class StaticPagesController < ApplicationController
  def SketchApp
	@drawing ||= Drawing.recent
	@drawnew ||= Drawing.new
  end
  
end
