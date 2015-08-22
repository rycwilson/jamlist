class SongsController < ApplicationController

  # The actions in this file are for json response only
  respond_to :json

  #
  # GET /songs.json
  #
  def show
    @songs = Song.all
    respond_with @songs, include: [:setlists]
  end

  def create
  end

  def update
  end

  def destroy
  end

end
