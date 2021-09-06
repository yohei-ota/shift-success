class ActualWorksController < ApplicationController

  def new
    @schedules = WorkSchedule.where(group_id: current_admin.group_id).where("datetime_in >= ?", Date.today)
    @users = User.where(group_id: current_admin.group_id)
  end

  def create

  end
end
