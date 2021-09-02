class AdminPostsController < ApplicationController
  before_action :authenticate_admin!

  def index
    @users = User.where(group_id: current_admin.group_id)
  end
end
