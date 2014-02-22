class StaticPagesController < ApplicationController
  def SketchApp
	@drawing ||= Drawing.recent
  end
  
end
