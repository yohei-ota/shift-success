class AdminPostsController < ApplicationController
  before_action :authenticate_admin!

  def index
    @today = Date.today
    @users = User.where(group_id: current_admin.group_id)
    @works = ActualWork.where(group_id: current_admin.group_id).where(date: Date.today).order("user_id ASC")
  end
end
