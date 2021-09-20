class UserPostsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @today = Date.today
    @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
    @schedules = WorkSchedule.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date_in_time >= ?", Date.today.month).order("date_in_time ASC")
  end
end