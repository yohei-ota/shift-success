class UserPostsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @today = Date.today
    @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
    @plans = WorkSchedule.where(group_id: current_user.group_id).where(user_id: current_user.id).where("datetime_in >= ?", Date.today).order("datetime_in ASC")
  end
end