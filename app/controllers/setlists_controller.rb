class SetlistsController < ApplicationController

  # The actions in this file are for json response only
  respond_to :json

  #
  # GET /setlists.json
  #
  def index
    @setlists = Setlist.all
    respond_with @setlists, include: [:songs]
  end

  #
  # POST /setlists.json
  #
  def create
    @setlist = Setlist.new setlist_params
    if @setlist.save
      respond_with @setlist
    else
      render json: { status:"error",
                       mesg:"validations failed" }, status: 500
    end
  end

  def update
  end

  def destroy
  end

  private

  def setlist_params
    params.require(:setlist).permit(:name)
  end

end
