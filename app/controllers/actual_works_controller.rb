class ActualWorksController < ApplicationController

  def new
    @today = Date.today
    @schedules = WorkSchedule.where(group_id: current_admin.group_id).where("datetime_in >= ?", Date.today)
    @works = ActualWork.new
    @users = User.where(group_id: current_admin.group_id)
  end

  def create

  end
end
