class SiteController < ApplicationController

  respond_to :html, :json

  def index
    # sign in or sign up
    redirect_to jamlist_path
  end

  def show
    # @user = current_user
    # respond_with @user, include:
  end

end
