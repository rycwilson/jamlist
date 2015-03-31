class Setlist < ActiveRecord::Base
  # add validations to setlist name?
  validates :name, presence: true
  has_many :songs_plays
  has_many :songs, through: :songs_plays
end
