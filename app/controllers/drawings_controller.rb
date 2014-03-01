class DrawingsController < ApplicationController
  before_action :set_drawing, only: [:show]

  # GET /drawings
  # GET /drawings.json
  def index
    @drawings = Drawing.all.paginate(page: params[:page], per_page: 9)
  end
    
  # GET /drawings/1
  # GET /drawings/1.json
  def show
  end

  # GET /drawings/new
  def new
    @drawing = Drawing.new
  end

 
  # POST /drawings
  # POST /drawings.json
  def create
    @drawing = Drawing.new(drawing_params)

	#this is supposed to notice that I am using js but it still calls the html...using jquery/javascript to get the value from the json which comes as the response text from the request.
    respond_to do |format|
      if @drawing.save
		format.html { head :created }
        format.json { head :created }
      else
	  #the only possible error SHOULD be no name because the rest are not user inputs (strictly)
		format.html { render json: @drawing.errors.full_messages.to_sentence, status: :unprocessable_entity }
        format.json { render json: @drawing.errors.full_messages.to_sentence, status: :unprocessable_entity }
		
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_drawing
      @drawing = Drawing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def drawing_params
      params.require(:drawing).permit(:name, :commands, :startx, :starty)
    end
end
