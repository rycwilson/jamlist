class SetlistsController < ApplicationController

  # The actions in this file are for json response only
  respond_to :json

  #
  # GET /setlists.json
  #
  def show
    @setlists = Setlist.all
    respond_with @setlists, include: [:songs]
  end

  def create
  end

  def update
  end

  def destroy
  end

end
