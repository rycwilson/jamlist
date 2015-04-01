class SetlistsController < ApplicationController

  before_action :find_setlist, only: [:show, :edit, :update, :destroy, :new_song]
  before_action :find_setlist_songs, only: [:show, :edit]

  # The shared navbar needs access to all songs
  before_action :find_all_songs

  def index
    @setlists = Setlist.all
  end

  def new
    @setlist = Setlist.new
  end

  def show
  end

  def edit
  end

  def create
    @setlist = Setlist.new setlist_params
    if @setlist.save
      redirect_to setlists_path
    else
      flash.now[:alert] = "Input validation failed"
      render :new
    end
  end

  def update
    # catch any updates to song notes that come through
    if (song = Song.find params[:song_id])
      # no notes field validations to check
      song.update_attributes song_params
      redirect_to setlist_song_path(@setlist, song)
    else
      if @setlist.update_attributes setlist_params
        redirect_to setlist_path(@setlist)
      else
        flash.now[:alert] = "Input validations failed"
        render :edit
      end
    end
  end

  def destroy
    @setlist.destroy
    redirect_to setlists_path
  end

  def new_song
    @song_new = Song.new
  end

  # depending on what user submitted, this may add a song to the database,
  # or just add an existing song into setlist.songs
  def add_song
    setlist = Setlist.find params[:id]
    # check which form was submitted by inspecting presence of :song_lib
    if params[:song_lib] == nil
      # adding a new song to the library
      # can't use a song_params method here because the form is not bound to a song object
      song = Song.new song_params
      if song.save
        setlist.songs << song
        redirect_to setlist_path(setlist)
      else
        flash.now[:alert] = "Input validations failed"
        render :new_song
      end
    else
      # adding an existing song
      song = Song.where(title: params[:song_lib][0, (params[:song_lib].index('-') - 1)])[0]
      setlist.songs << song
      redirect_to setlist_path(setlist)
    end
  end

  private

  def find_setlist
    @setlist = Setlist.find params[:id]
  end

  def find_setlist_songs
    @songs = @setlist.songs
  end

  def find_all_songs
    @songs_all = Song.all
  end

  def setlist_params
    params.require(:setlist).permit(:name)
  end

  def song_params
    params.require(:song).permit(:artist, :title, :notes)
  end

end
