class SongsController < ApplicationController

  def index
    @songs = Song.all
    @master = Setlist.where(name:'master')[0]
  end

  def new
    @song = Song.new
    # redirect where?
    # depends where came from, library view or setlist view
  end

  def show
  end

  def show_setlist_song
    @setlist = Setlist.find params[:id]
    @song = Song.find params[:song_id]
    @songs = @setlist.songs
    @song_url = "http://lyrics.wikia.com/#{@song.artist.split.join('_')}:#{@song.title.split.join('_')}"
  end

  def create
    @song = Song.new song_params
    if @song.save
      redirect_to songs_path
    else
      flash.now[:alert] = "Input validation failed"
      render :new
    end
  end

  private

  def song_params
    params.require(:song).permit(:artist, :title)
  end

end
