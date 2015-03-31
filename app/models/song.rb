class Song < ActiveRecord::Base
  validates :title, :artist, presence: true
  has_many :songs_plays
  has_many :setlists, through: :songs_plays
end
