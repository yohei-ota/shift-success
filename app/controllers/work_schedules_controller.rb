class WorkSchedulesController < ApplicationController
  before_action :authenticate_user!
  before_action :page_ready, only: [:new, :create]

  def new
    @plans = WorkSchedule.where(group_id: current_user.group_id).where(user_id: current_user.id).where("datetime_in >= ?", Date.today).order("datetime_in ASC")
    @schedules = WorkScheduleCollection.new
    @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
  end

  def create
    @schedules = WorkScheduleCollection.new(schedule_collections_params)
    WorkScheduleCollection::COLLECTION_NUM.times do |i| #非表示にして月初になっている日付を「再来週」から7日間分に変更
      @schedules.collections[i].datetime_in += (@today.days_since(14).beginning_of_week.day + i - 1) * 60 * 60 * 24
      @schedules.collections[i].datetime_out += (@today.days_since(14).beginning_of_week.day + i - 1) * 60 * 60 * 24
    end
    if @schedules.save
      redirect_to new_work_schedule_path
    else
      @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
      @plans = WorkSchedule.where(group_id: current_user.group_id).where(user_id: current_user.id).where("datetime_in >= ?", Date.today).order("datetime_in ASC")
      render :new
    end
  end


  private

  def page_ready
    @today = Date.today
    @group = Group.find(params[:id])
  end

  def schedule_collections_params
    params
      .require(:work_schedule_collection)
      .permit({collections_attributes: [WorkScheduleCollection::REGISTRABLE_ATTRIBUTES]}, :add_request)
      .merge(user_id: current_user.id, group_id: params[:id])
  end
end
