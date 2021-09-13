class ActualWorksController < ApplicationController

  def new
    @today = Date.today
    @schedules = WorkSchedule.where(group_id: current_admin.group_id).where("datetime_in >= ?", Date.today)
    @works = ActualWork.new
    @users = User.where(group_id: current_admin.group_id)
    gon.schedules = @schedules
    gon.users = @users
  end

  def create
    @works = ActualWork.new(actual_work_params)
    if @works.valid?
      @works.save
    else
      redirect_to new_actual_work_path
    end
    redirect_to new_actual_work_path
  end


  def edit
    @today = Date.today
    @works = ActualWork.where(group_id: current_admin.group_id).where("date >= ?", Date.today)
    @users = User.where(group_id: current_admin.group_id)
    gon.works = @works
    gon.users = @users
    gon.admin = current_admin
  end

  def update

  end


  private

  def actual_work_params
    params.require(:actual_work).permit(:user_id, :date, :datetime_in_actual, :datetime_out_actual, :holiday_actual).merge(group_id: params[:id])
  end
end
