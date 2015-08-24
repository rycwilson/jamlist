class SongsController < ApplicationController

  # The actions in this file are for json response only
  respond_to :json

  #
  # GET /songs.json
  #
  def index
    @songs = Song.all
    respond_with @songs, include: [:setlists]
  end

  #
  # POST /songs.json
  #
  def create
    @song = Song.new song_params
    if @song.save
      respond_with @song
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

  def song_params
    params.require(:song).permit(:title, :artist)
  end

end
