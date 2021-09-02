class UserPostsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @today = Date.today
  end
end
