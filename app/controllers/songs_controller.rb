class SongsController < ApplicationController

  before_action :find_song, only: [:show, :update]
  # The shared navbar needs access to all songs
  before_action :find_all_songs

  def index
    # Ideally a go_to_song (selected from the main nav dropdown)
    # would be routed straight to the show method, but such routing
    # requires an id which we don't have access to in the go_to_song form
    if params[:go_to_song]
      redirect_to song_path(get_song_id params[:go_to_song])
    end
  end

  def new
    @song = Song.new
    # redirect where?
    # depends where came from, library view or setlist view
  end

  def show
    @lyrics_url = "http://lyrics.wikia.com/#{@song.artist.split.join('_')}:#{@song.title.split.join('_')}"
  end

  def show_setlist_song
    @setlist = Setlist.find params[:id]
    @song = Song.find params[:song_id]
    @songs = @setlist.songs
    @lyrics_url = "http://lyrics.wikia.com/#{@song.artist.split.join('_')}:#{@song.title.split.join('_')}"
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

  def update
    respond_to do |format|
      if @song.update_attributes song_params
        format.html
        format.json { render json: @song, status: :ok }
      else
        flash[:alert] = "Input validations failed"
      end
    end
  end

  private

  def get_song_id song
    songg = Song.where(title: song[0, (song.index('-') - 1)])[0]
    songg.id
  end

  def find_song
    @song = Song.find params[:id]
  end

  def find_all_songs
    @songs_all = Song.all
  end

  def song_params
    params.require(:song).permit(:artist, :title, :notes)
  end

end
