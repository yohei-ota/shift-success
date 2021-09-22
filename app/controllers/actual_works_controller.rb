class ActualWorksController < ApplicationController
  before_action :authenticate_admin!
  before_action :page_ready, only: [:new, :edit]

  def new
    @works = ActualWork.new
    @schedules = WorkSchedule.where(group_id: current_admin.group_id).where("datetime_in >= ?", Date.today)
    gon.schedules = @schedules
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
    @works = ActualWork.where(group_id: current_admin.group_id).where("date >= ?", Date.today).order("user_id ASC")
    gon.works = @works
  end

  def update
    works = ActualWork.where(group_id: params[:id]).where(user_id: params[:actual_work][:user_id]).where(date: params[:actual_work][:date])
    works.update(actual_work_params)
    redirect_to edit_actual_work_path
  end


  private

  def page_ready
    @today = Date.today
    @users = User.where(group_id: current_admin.group_id)
    gon.users = @users
    gon.admin = current_admin
  end

  def actual_work_params
    params.require(:actual_work).permit(:user_id, :date, :datetime_in_actual, :datetime_out_actual, :over_early_time, :holiday_actual).merge(group_id: params[:id])
  end
end
