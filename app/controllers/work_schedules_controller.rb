class WorkSchedulesController < ApplicationController

  def new
    @today = Date.today
    @group = Group.find(params[:id])
    @plans = WorkSchedule.where(group_id: current_user.group_id).where("datetime_in >= ?", Date.today).order("datetime_in ASC")
    @schedules = WorkScheduleCollection.new
    @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
  end

  def create
    @today = Date.today
    @group = Group.find(params[:id])
    @schedules = WorkScheduleCollection.new(schedule_collections_params)
    WorkScheduleCollection::COLLECTION_NUM.times do |i| #非表示にして月初になっている日付を「再来週」から7日間分に変更
      @schedules.collections[i].datetime_in += (@today.days_since(14).beginning_of_week.day + i - 1) * 60 * 60 * 24
      @schedules.collections[i].datetime_out += (@today.days_since(14).beginning_of_week.day + i - 1) * 60 * 60 * 24
    end
    if @schedules.save
      redirect_to user_posts_path
    else
      @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
      render :new
    end
  end


  private

  def schedule_collections_params
    params
      .require(:work_schedule_collection)
      .permit({collections_attributes: [WorkScheduleCollection::REGISTRABLE_ATTRIBUTES]}, :add_request)
      .merge(user_id: current_user.id, group_id: params[:id])
  end
end
